

const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");  

const {createMembershipPlan,getAllMembershipPlans}= require("../controller/membershipController")



router.post("/create", authMiddleware, authorizeRoles("admin"), createMembershipPlan)
router.get("/",getAllMembershipPlans)



module.exports = router;