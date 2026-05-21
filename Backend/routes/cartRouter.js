const express = require("express")

const router = express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
const {addToCart,getCart}=require ("../controller/cartController")





router.post("/add",authMiddleware,addToCart)
router.get("/",authMiddleware,getCart)

module.exports=router