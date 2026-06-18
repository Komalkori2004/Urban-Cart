
const express = require("express");
const router = express.Router();
const {createContact,getContact,markAsRead}=require("../controller/contactController")

const { authMiddleware, authorizeRoles } = require("../middleware/authMiddlewar")


router.post("/create",createContact)
router.get("/",authMiddleware,authorizeRoles("admin"),getContact)
router.put( "/:id/read",authMiddleware,authorizeRoles("admin"),markAsRead)
module.exports=router