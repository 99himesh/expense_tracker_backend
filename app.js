const express=require("express");
require('dotenv').config()
const app=express();
const cors=require("cors");
const db=require("./utils/database.js");
const bodyParser = require('body-parser');
//model
const UserModel=require("./models/UserModel.js");
const ExpenseModel=require("./models/ExpenseModel.js")
const userRoute=require("./routes/UserRoute.js");
const expenseRoute=require("./routes/ExpenseRoute.js");
const paymentRoute=require("./routes/paymentRoute.js")
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


UserModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(UserModel)


app.use("/users",userRoute)
app.use("/expense",expenseRoute)
app.use("/payment",paymentRoute)
 db.sync().then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running"); 
    })
    }).catch((err)=>{
            console.log(err);        
})