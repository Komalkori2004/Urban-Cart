
const express = require("express");
const router = express.Router();
const {createContact}=require("../controller/contactController")



router.post("/create",createContact)



module.exports=router