const express=require("express");
const router=express.Router();
const userController=require("../controller/userController.js")

router.post("/signUp",userController.signUp)
router.post("/login",userController.logIn)
router.post("/send-forget-password-link",userController.sendforgetPasswordLink)
router.post("/set-new-password",userController.setNewPassword)
router.get("/leaderBoard",userController.getAllUser)

module.exports=router;