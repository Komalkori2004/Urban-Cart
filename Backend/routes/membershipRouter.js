

const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");  

const {createMembershipPlan,getAllMembershipPlans,getSingleMembershipPlan, updateMembershipPlan, deleteMembershipPlan,purchaseMembership}= require("../controller/membershipController")



router.post("/create", authMiddleware, authorizeRoles("admin"), createMembershipPlan)
router.get("/",getAllMembershipPlans)
router.get("/:slug",getSingleMembershipPlan)
router.put("/:id",authMiddleware,authorizeRoles("admin"),updateMembershipPlan)
router.delete("/:id",authMiddleware,authorizeRoles("admin"),deleteMembershipPlan)
router.post("/purchase/:planId",authMiddleware,purchaseMembership)




module.exports = router;