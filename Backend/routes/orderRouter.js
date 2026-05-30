  const express = require("express")
  const router = express.Router()
  const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
  const { placeOrder,getMyOrder,getOrderbyId,orderStatus  } = require("../controller/orderController")


  router.get("/test", (req, res) => {
    res.send("Order Route Working");
});
  
  router.post("/", authMiddleware,placeOrder) 
  router.get("/myorders", authMiddleware, getMyOrder)
  router.get("/:id",authMiddleware,getOrderbyId )
  router.put("/:id/status",authMiddleware,authorizeRoles("admin"),orderStatus )




  

module.exports=router