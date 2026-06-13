

const express =require("express")
const router=express.Router()
const {createCoupon,getAllCoupons}= require("../controller/couponController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

router.post("/create",authMiddleware,authorizeRoles("admin"),createCoupon)
router.get("/admin-coupons",authMiddleware,authorizeRoles("admin"),getAllCoupons)

module.exports=router