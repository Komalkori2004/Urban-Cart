

const express = require("express");
const router=express.Router()


const {addToWishlist}=require("../controller/wishlistController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/add",authMiddleware,addToWishlist)


module.exports=router