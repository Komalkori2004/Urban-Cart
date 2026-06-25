

const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");  

const {createMembershipPlan}= require("../controller/membershipController")



router.post("/create", authMiddleware, authorizeRoles("admin"), createMembershipPlan)



module.exports = router;