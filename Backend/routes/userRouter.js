


const express =require("express")
const router=express.Router()
const upload = require("../middleware/multer")



const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

const {updateProfile, changePassword,uploadProfileImage } = require("../controller/userController")



router.put("/profile",authMiddleware,updateProfile)
router.put("/change-password",authMiddleware,changePassword)
router.put(
    "/profile-image",
    authMiddleware,
    upload.single("avatar"),
    uploadProfileImage
);



module.exports=router