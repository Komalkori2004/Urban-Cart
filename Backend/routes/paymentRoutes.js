

const express=require("express")

const router=express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


const {createRozerOrder}=require("../controller/paymentController")

router.post("/pay",authMiddleware,createRozerOrder)

module.exports=router
