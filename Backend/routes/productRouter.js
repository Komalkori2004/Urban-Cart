const express = require("express")

const router = express.Router()
const upload = require("../middleware/multer")


const { createProduct, getAllProduct, getSingleProduct ,updateProducts} = require("../controller/productController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/create", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), createProduct)

router.get("/", getAllProduct)
router.get("/:slug", getSingleProduct)
router.put("/:id", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), updateProducts)

module.exports = router