const express=require("express");
const router=express.Router();
const paymentControllers=require("../controller/paymentController")
const authentication = require("../middleware/auth");

router.post("/pay",authentication.authenticate,paymentControllers.createOrders)
router.get("/payment-status/:id",authentication.authenticate,paymentControllers.getPaymentDetails)

module.exports=router;