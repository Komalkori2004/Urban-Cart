  const express = require("express")
  const router = express.Router()
  const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")
  const { placeOrder,getMyOrder,getOrderbyId  } = require("../controller/orderController")


  router.get("/test", (req, res) => {
    res.send("Order Route Working");
});
  
  router.post("/", authMiddleware,placeOrder) 
  router.get("/myorders", authMiddleware, getMyOrder)
  router.get("/:id",authMiddleware,getOrderbyId )



  

module.exports=router