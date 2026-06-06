

const express = require("express");
const router=express.Router()


const {addToWishlist,getWishlist}=require("../controller/wishlistController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/add",authMiddleware,addToWishlist)
router.get("/",authMiddleware,getWishlist)


module.exports=router