const express = require("express")
const router = express.Router()
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
const { placeOrder, getMyOrder, getOrderbyId, orderStatus, cancleOrder, getAllOrders } = require("../controller/orderController")





router.post("/", authMiddleware, placeOrder)
router.get("/", authMiddleware, authorizeRoles("admin"), getAllOrders)
router.get("/myorders", authMiddleware, getMyOrder)
router.get("/:id", authMiddleware, getOrderbyId)
router.put("/:id/status", authMiddleware, authorizeRoles("admin"), orderStatus)
router.put("/:id/cancel", authMiddleware, cancleOrder)







module.exports = router