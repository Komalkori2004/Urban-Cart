

const express=require("express")
const router=express.Router()

const upload = require("../middleware/multer")
const {createCategory,getCategory}=require("../controller/categoryController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

router.post(
    "/create",
    authMiddleware,
    authorizeRoles("admin"),
    upload.single("image"),
    createCategory
)
router.get("/",getCategory)


module.exports=router