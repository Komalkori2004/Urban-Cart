


const express =require("express")
const router=express.Router()



const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

const {updateProfile } = require("../controller/userController")



router.put("/profile",authMiddleware,updateProfile)




module.exports=router