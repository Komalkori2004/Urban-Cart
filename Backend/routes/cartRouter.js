const express = require("express")

const router = express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
const {addToCart,getCart,removeCart}=require ("../controller/cartController")





router.post("/add",authMiddleware,addToCart)
router.get("/",authMiddleware,getCart)
router.delete("/:productId",authMiddleware,removeCart)

module.exports=router