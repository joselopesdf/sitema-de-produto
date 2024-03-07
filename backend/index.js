
const express = require("express")
require('dotenv').config()






// framework express inicializado
const app = express()


app.use("/upload",express.static("upload"))
app.use(express.json())
app.use(
  express.urlencoded({
      extended :false
  })
)



// cookkies
const cookieParser = require("cookie-parser")

// cors
const cors = require("cors")

//middleware


app.use(cors({
  origin : 'http://localhost:5173',
  methods : ['GET,POST,PUT,DELETE,PATCH'],
  allowHeaders : ['Content-Type'],
  credentials : true
}))
app.use(cookieParser())




const Port = process.env.Port || 3500

// models
const User = require("./models/User")
const Product = require("./models/Product")

//routes
const UserRoutes = require("./routes/UserRoutes")
const ProductRoutes = require("./routes/ProductRoutes")

const conn = require("./db/conn")

// middlewares routes
app.use("/user",UserRoutes)
app.use("/produts",ProductRoutes)



//conexao ao banco e escutar porta
conn.sync()
.then(()=>{
  app.listen(Port)

})
.catch((err)=>console.log(err))

