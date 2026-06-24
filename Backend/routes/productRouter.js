const express = require("express")

const router = express.Router()
const upload = require("../middleware/multer")


const { createProduct, getAllProduct, getSingleProduct, updateProducts, deleteProduct, getSingleProductById, CreateReview, searchProducts } = require("../controller/productController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")



router.get("/", getAllProduct)
router.get(
  "/search",
  searchProducts
);
router.post(
  "/:id/review",
  authMiddleware,
  CreateReview
)
router.get(

  "/single/:id",

  authMiddleware,

  authorizeRoles("admin"),

  getSingleProductById
)
router.post("/create", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), createProduct)
router.get("/:slug", getSingleProduct)


router.put("/:id", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), updateProducts)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), upload.array("images", 5), deleteProduct)

module.exports = router