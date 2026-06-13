const express=require("express");
const router=express.Router();
const expenseController=require("../controller/expenseController.js");
const authentication = require("../middleware/auth.js");


router.post("/addExpense",authentication.authenticate,expenseController.addExpense)
router.get("/getExpense",authentication.authenticate,expenseController.getExpense)
router.delete("/deleteExpense/:id",authentication.authenticate,expenseController.deleteExpense)


module.exports=router;