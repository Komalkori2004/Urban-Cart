


const express =require("express")
const router=express.Router()



const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

const {updateProfile, changePassword } = require("../controller/userController")



router.put("/profile",authMiddleware,updateProfile)
router.put("/change-password",authMiddleware,changePassword)



module.exports=router