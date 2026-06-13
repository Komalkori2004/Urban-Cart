

const express =require("express")
const router=express.Router()
const {createCoupon,getAllCoupons,updateCoupon  }= require("../controller/couponController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

router.post("/create",authMiddleware,authorizeRoles("admin"),createCoupon)
router.get("/admin-coupons",authMiddleware,authorizeRoles("admin"),getAllCoupons)
router.put("/update/:id",authMiddleware,authorizeRoles("admin"),updateCoupon)


module.exports=router