const Product = require("../models/Product")

const path =require("path")
const fs = require("fs")


class ProductController {

    
    static async createProducts(req,res){

        const name = req.body.name
        const price = req.body.price
        const UserId = req.body.UserId
        const file = req.file

    
        if(!name){
             res.status(400).json({msg : "digite o nome"})
             return
         }
         
         if(!price){
             res.status(400).json({msg : "digite o preco"})
             return
         }
         if(isNaN(price)){
             res.status(422).json({msg : "preco invalido"})
             return
         }
         if(!file){
            res.status(404).json({msg : "imagem nao encontrada"})
            return
        }
       

       

        const data = {
            name,
            price,
            file:file.originalname,
            UserId
        }

        try{
            const newProdut = await Product.create(data)

            return res.status(201).json({msg :newProdut})

        }catch(erro){
            return res.status(500).json({msg : "erro inesperado no servidor"})
           
        }
    }
    static async deleteProdut(req,res){

        const id = req.params.id

        const produt = await Product.findOne({where :{id :id}})

        if(!produt){
            return res.status(404).json({msg : "produto nao existe"})
        }

        const image =  produt.file
        console.log(image)

        const file = "C:/Users/Mekissi lopes/Desktop/fullstack/backend/upload/"+image

        console.log(path.dirname(file))

        try{
            await Product.destroy({where :{id :id}})

            fs.unlink(file,function(erro){
                if(!erro){
                    console.log("deletado")
                }
                console.log("erro ao deletar")
            })
            return res.status(200).json({msg :produt})
            

        }catch(erro){
            return res.status(500).json({msg :"ocorreu erro inesperado no servidor"})
        }
        
        
        


        
        
        
       
        

    //    try{
        

    //     await Product.destroy({where :{id :id}})
       
    //     return res.status(200).json({msg : "produto eliminado com sucesso"})
        
    //    }catch(erro){
    //     console.log(erro)
    //    }
        
    }
    static async getProduts(req,res){

        const id = req.params.id

        const Produt = await Product.findByPk(id,{attributes :["name","price","file","UserId"]})

        if(!Produt){
            return res.status(404).json({msg : "pagina nao encontrada"})
        }

        return res.status(200).json({msg:Produt})
    }
  
    static async editProduts(req,res){

        const id = req.params.id

        const Produt = await Product.findByPk(id)

        const UserId = req.body.UserId
        const name = req.body.name
        const price = req.body.price
        const file = req.file

        const oldfile = Produt.file

        const caminho = "C:/Users/Mekissi lopes/Desktop/fullstack/backend/upload/"+oldfile

        const data = {

        }
        data.UserId = UserId


        if(!name){
            res.status(400).json({msg : "digite o nome"})
            return
        }
        data.name = name
        
        if(!price){
            res.status(400).json({msg : "digite o preco"})
            return
        }
        
        if(isNaN(price)){
            res.status(422).json({msg : "preco invalido"})
            return
        }
        data.price=price

        if(file){
          data.file =file.originalname

          fs.unlink(caminho,function(erro){
            if(!erro){
                console.log("deletado")
            }
            console.log("erro ao deletar")
        })

       }
       else{
        data.file = oldfile

       }

     
    try{
        const newProdut = await Product.update(data,{where :{id:id}})
       

        return res.status(201).json({msg : "produto editado com sucesso"})

    }catch(erro){
        return res.status(500).json({msg : "erro inesperado no servidor"})
       
    }

    }

}

module.exports = ProductController