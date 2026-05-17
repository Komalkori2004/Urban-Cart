const express = require("express")

const router = express.Router()
const upload = require("../middleware/multer")


const { createProduct, getAllProduct, getSingleProduct, updateProducts, deleteProduct } = require("../controller/productController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")



router.get("/", getAllProduct)
router.get("/:slug", getSingleProduct)
router.post("/create", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), createProduct)

router.put("/:id", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), updateProducts)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), deleteProduct)
module.exports = router