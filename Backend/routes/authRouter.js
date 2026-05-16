

const express=require("express")
const router=express.Router()
const{registerUser,LoginUser,getProfile,AdminDashboard}=require("../controller/auth")
const {authMiddleware,authorizeRoles}=require("../middleware/authMiddlewar")

router.post("/register",registerUser)
router.post("/login",LoginUser) 
router.get("/profile",authMiddleware,getProfile)
router.get("/admin",authMiddleware,authorizeRoles("admin"),AdminDashboard)

module.exports=router