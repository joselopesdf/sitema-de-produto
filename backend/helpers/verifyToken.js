
const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{

    // const headers = req.headers["authorization"]
    // const token = headers &&  headers.split("")[1]
   
    const token = req.cookies.token


    if(!token){
        return  res.status(404).json({msg :"token nao encontrado"})
    }

    try{

        const decoded = jwt.verify(token,process.env.JwtPassword)

        req.UserId = decoded.id
        console.log(req.UserId)

        next()

    }catch(erro){
        return  res.status(401).json({msg :"token Invalido ou expirado"})
    }
    
  
    
     

}

module.exports = verifyToken