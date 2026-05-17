    const express=require("express")

    const router=express.Router()
    const {createProduct,getAllProduct,getSingleProduct}=require("../controller/productController")

    const {authMiddleware,authorizeRoles}=require("../middleware/authMiddlewar")
    

    router.post("/create",authMiddleware,authorizeRoles("admin"),createProduct)

    router.get("/",getAllProduct)
    router.get("/:slug",getSingleProduct)

    module.exports=router