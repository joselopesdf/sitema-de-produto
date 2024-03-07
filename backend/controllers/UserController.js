const User = require("../models/User")

const Product = require("../models/Product")

const bcrypt = require("bcrypt")


const jwt = require('jsonwebtoken')

const getUser = require("../helpers/getUserToken")
const { Op } = require("sequelize")

class UserController {

    static async getUser(req,res){

      const token = req.cookies.token

      const id = req.UserId


      try{
      
         const user = await User.findOne({where :{id :id} ,attributes :['name','email','id'],include : Product})

         const produts =  user.Produts

         return res.status(200).json({msg : user, produts})

      }catch(erro){
        return res.status(500).json({erro : "erro inesperado no servidor"})
      }

    }
    static async register(req,res){

        const {name,email,password,confirmpassword} = req.body

        if(!name){
           res.status(400).json({msg :"Nome nao pode estar vazio"})
           return
            
        }
        if(!email){
             res.status(400).json({msg :"Email nao pode estar vazio"})
             return
              
          }

      
        const emailExist = await User.findOne({where :{email :email}})
          if(!password){
             res.status(400).json({msg :"senha nao pode estar vazio"})
             return 
              
          }

          if(!confirmpassword){
             res.status(400).json({msg :"confirmar senha nao pode estar vazio"})
             return
              
          }
          if(password !== confirmpassword){
            res.status(422).json({msg :"senhas nao conferem"})
            return 
              
          }
          if(password ===confirmpassword && password.length <=7){
            res.status(422).json({msg :"senha muito curta"})
            return 

          }
          
          if(emailExist){
             res.status(422).json({msg :"Este email ja existe"})
             return 

          }
          const hashedPassword =  bcrypt.hashSync(password,10)

        const newUser = {name,email,password:hashedPassword}


        try{
            await User.create(newUser)
            res.status(201).json({msg :"usuario criado com sucesso"})

        }catch(erro){
            return res.status(500).json({erro :"Ocorrreu um erro no servidor"})
        }
    }
    static async login(req,res){

        const {email,password} = req.body

          if(!email){
             res.status(400).json({msg :"Email nao pode estar vazio"})
             return
              
          }
          if(!password){
             res.status(400).json({msg :"senha nao pode estar vazio"})
             return 
              
          }
          
          const emailExist = await User.findOne({where :{email :email}})

          if(!emailExist){
            res.status(422).json({msg :"este  email nao existe"})
            return 

         }

         const checkPassword =  await bcrypt.compare(password,emailExist.password)


         if(!checkPassword){
            res.status(400).json({msg :"senhas nao conferem"})
            return 

          }

          const token = jwt.sign({id :emailExist.id},process.env.JwtPassword,{
            expiresIn:"1h"
          })

          try{

            res.cookie("token",token,{
               path :'/',
               expires: new Date(Date.now() + 1000 * 3600),
               httpOnly :true,
               sameSite :"lax"
               
             })
   
             return   res.status(200).json({msg :"Usuario logado com sucesso",credentials : token})

          }catch(erro){
            res.status(500).json({erro :"erro inesperado no servidor"})

          }

    }
    static async logout(req,res){
      try{
         res.clearCookie("token")
         return  res.status(200).json({msg :"logout com sucesso"})

      }
      catch(erro){
         return  res.status(500).json({erro :"erro inesperado no servidor"})

      }

     
    }
    static async deleteUser(req,res){

      const {id} = req.params

      const user = await User.findOne({where :{id:id}})

      if(!user){
         return res.status(404).json({msg : "usuario nao encontrado"})
      }
      await User.destroy({where :{id : id}})
      return res.status(200).json({msg : "usuario deletado com sucesso"})
      
    }
   
}

module.exports = UserController