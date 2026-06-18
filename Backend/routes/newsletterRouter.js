

const express = require("express");
const router = express.Router();
const {subscribeNewsletter}=require("../controller/newsletterController")
// const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar");/


router.post("/subscribe", subscribeNewsletter)
module.exports = router;