const express = require("express")

const router = express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
const {addToCart}=require ("../controller/cartController")





router.post("/add",authMiddleware,addToCart)

module.exports=router