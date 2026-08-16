// const {Sequelize,DataTypes}=require("sequelize");
// const sequelize=require("../utils/database.js")


// const DownloadedExpense=sequelize.define(
//     'DownloadedExpense',{
//         id:{
//             type:DataTypes.INTEGER,
//             primaryKey:true,
//             autoIncrement:true,
//             allowNull:false
//         },
//         file:{
//           type:DataTypes.STRING,
//           allowNull:false ,

//         },
       
//     }

// )


// module.exports=DownloadedExpense;



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    const downloadExpenseSchema = new Schema({
      file: {
        type: String,
        required: true
      },
      userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
      }

    },{timestamps:true});


    const DownloadedExpense=mongoose.model("DownloadedExpense",downloadExpenseSchema);
    module.exports=DownloadedExpense;