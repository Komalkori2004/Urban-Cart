

const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");  

const {createMembershipPlan,getAllMembershipPlans,getSingleMembershipPlan, updateMembershipPlan,
     deleteMembershipPlan,purchaseMembership, verifyMembershipPayment, getMyMembership,getMembershipHistory

}= require("../controller/membershipController")


router.get("/my-membership",authMiddleware,getMyMembership)

router.post("/create", authMiddleware, authorizeRoles("admin"), createMembershipPlan)

router.get("/",getAllMembershipPlans)

router.get("/history",authMiddleware,getMembershipHistory)

router.get("/:slug",getSingleMembershipPlan)

router.put("/:id",authMiddleware,authorizeRoles("admin"),updateMembershipPlan)

router.delete("/:id",authMiddleware,authorizeRoles("admin"),deleteMembershipPlan)

router.post("/purchase/:planId",authMiddleware,purchaseMembership)

router.post("/verify-payment",authMiddleware,verifyMembershipPayment)






module.exports = router;