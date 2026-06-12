

const express =require("express")
const router=express.Router()
const {createCoupon}= require("../controller/couponController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

router.post("/create",authMiddleware,authorizeRoles("admin"),createCoupon)

module.exports=router