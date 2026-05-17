    const express=require("express")

    const router=express.Router()
    const {createProduct}=require("../controller/productController")

    const {authMiddleware,authorizeRoles}=require("../middleware/authMiddlewar")
    

    router.post("/create",authMiddleware,authorizeRoles("admin"),createProduct)

    module.exports=router