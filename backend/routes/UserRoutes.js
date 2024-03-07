
const router = require("express").Router()

const UserController = require("../controllers/UserController")
const verifyToken = require("../helpers/verifyToken")

router.get("/",verifyToken,UserController.getUser)
router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.post("/logout",UserController.logout)
router.delete("/:id",UserController.deleteUser)



module.exports = router 