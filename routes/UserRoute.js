const express=require("express");
const router=express.Router();
const userController=require("../controller/userController.js")

router.post("/signUp",userController.signUp)
router.post("/login",userController.logIn)


module.exports=router;