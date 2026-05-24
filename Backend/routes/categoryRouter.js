

const express=require("express")
const router=express.Router()
const {createCategory,getCategory}=require("../controller/categoryController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")

router.post("/create",authMiddleware,authorizeRoles("admin"),createCategory)
router.get("/",getCategory)


module.exports=router