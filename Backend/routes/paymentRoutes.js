

const express=require("express")

const router=express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


const {createRozerOrder,verifyPayment}=require("../controller/paymentController")

router.post("/create-order",authMiddleware,createRozerOrder)
router.post("/verify-payment",authMiddleware,verifyPayment)

module.exports=router
