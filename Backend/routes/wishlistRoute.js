

const express = require("express");
const router=express.Router()


const {addToWishlist,getWishlist,removeWishlist}=require("../controller/wishlistController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/add",authMiddleware,addToWishlist)
router.get("/",authMiddleware,getWishlist)

router.delete("/:productId",authMiddleware,removeWishlist)


module.exports=router