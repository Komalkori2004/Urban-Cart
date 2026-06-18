
const express = require("express");
const router = express.Router();
const {createContact,getContact}=require("../controller/contactController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/create",createContact)
router.get("/",authMiddleware,authorizeRoles("admin"),getContact)
module.exports=router