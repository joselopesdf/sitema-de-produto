const jwt = require("jsonwebtoken")
const getUser = (token)=>{
    if(!token){
        return  res.status(404).json({msg :"token nao encontrado"})

    }

    const decoded = jwt.verify(token,process.env.JwtPassword)

    const UserId = decoded.id
    return UserId

}
module.exports = getUser