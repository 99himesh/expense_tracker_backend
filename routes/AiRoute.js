const express=require("express");
const router=express.Router();
const authentication = require("../middleware/auth.js");
const aiController=require("../controller/aiController.js")

router.post("/",aiController.aiGpt)


module.exports=router;