// const {Sequelize,DataTypes}=require("sequelize");
// const sequelize=require("../utils/database.js")


// const Expense=sequelize.define(
//     'Expense',{
//         id:{
//             type:DataTypes.INTEGER,
//             primaryKey:true,
//             autoIncrement:true,
//             allowNull:false
//         },
//         expenseAmount:{
//           type:DataTypes.INTEGER,
//           allowNull:false ,

//         },
//         description:{
//           type:DataTypes.STRING,
//           allowNull:false  
//         },
//         category:{
//           type:DataTypes.STRING,
//           allowNull:false  
//         }
        
//     }

// )


// module.exports=Expense;










const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    const expenseSchema = new Schema({
      expenseAmount: {
        type: Number,
        required: true
      },
      description: {
        type: String
      },
      category: {
        type: String,
        required: true,
      },
      userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
      }

    },{timestamps:true});


    const Expense=mongoose.model("Expense",expenseSchema);
    module.exports=Expense;