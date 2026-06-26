

const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");  

const {createMembershipPlan,getAllMembershipPlans,getSingleMembershipPlan}= require("../controller/membershipController")



router.post("/create", authMiddleware, authorizeRoles("admin"), createMembershipPlan)
router.get("/",getAllMembershipPlans)
router.get("/:slug",getSingleMembershipPlan)




module.exports = router;