const router = require("express").Router()
const upload = require("../helpers/upload")
const ProductController = require("../controllers/ProductController")

const verifyToken = require("../helpers/verifyToken")


router.post("/",upload.single('file'),ProductController.createProducts)
router.delete("/:id",ProductController.deleteProdut)
router.get("/:id",verifyToken,ProductController.getProduts)

router.patch("/:id",upload.single('file'),ProductController.editProduts)




module.exports = router