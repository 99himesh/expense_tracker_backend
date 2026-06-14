const express=require("express");
require('dotenv').config()
const fs=require("fs")
const app=express();
const cors=require("cors");
const db=require("./utils/database.js");
const bodyParser = require('body-parser');
//model
const UserModel=require("./models/UserModel.js");
const ExpenseModel=require("./models/ExpenseModel.js")
const userRoute=require("./routes/UserRoute.js");
const expenseRoute=require("./routes/ExpenseRoute.js");
const paymentRoute=require("./routes/paymentRoute.js");
const aiRoute=require("./routes/AiRoute.js");
const compression = require("compression");
// const helmet=require("helmet");
const morgan=require("morgan");
const path = require("path");



const accessLogStream=fs.createWriteStream(
    path.join(__dirname,"ccess.log"),
    {flags:'a'}
)
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//helmet is used when you host in domain 
// app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream})) 

UserModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(UserModel)

app.use("/users",userRoute)
app.use("/expense",expenseRoute)
app.use("/payment",paymentRoute);
app.use("/ai",aiRoute)
 db.sync().then(()=>{
    app.listen(process.env.PORT ,(err)=>{
        console.log(`Server is running on port ${process.env.PORT}`); 
    }) 
    }).catch((err)=>{
            console.log(err);        
})