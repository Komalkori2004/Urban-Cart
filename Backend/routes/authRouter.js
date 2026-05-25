

const express=require("express")
const router=express.Router()
const{registerUser,LoginUser,getProfile,AdminDashboard,verifyEmail,resetPassword,forgotPassword}=require("../controller/auth")
const {authMiddleware,authorizeRoles}=require("../middleware/authMiddlewar")

router.post("/register",registerUser)
router.post("/login",LoginUser) 
router.get("/profile",authMiddleware,getProfile)
router.get("/admin",authMiddleware,authorizeRoles("admin"),AdminDashboard)
router.get("/verify/:token",verifyEmail)

router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)
module.exports=router