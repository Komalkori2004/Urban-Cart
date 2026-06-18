

const express = require("express");
const router = express.Router();
const {subscribeNewsletter,getSubscribers}=require("../controller/newsletterController")
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");


router.post("/subscribe", subscribeNewsletter)
router.get("/",authMiddleware,authorizeRoles("admin"),getSubscribers)
module.exports = router;