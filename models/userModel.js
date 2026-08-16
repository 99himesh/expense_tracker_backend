// const {Sequelize,DataTypes}=require("sequelize");
// const sequelize=require("../utils/database.js")


// const users=sequelize.define(
//     'users',{
//         id:{
//             type:DataTypes.INTEGER,
//             primaryKey:true,
//             autoIncrement:true,
//             allowNull:false
//         },
//         name:{
//           type:DataTypes.STRING,
//           allowNull:false ,

//         },
//         email:{
//           type:DataTypes.STRING,
//           allowNull:false  ,
//           unique:true 
//         },
//         password:{
//           type:DataTypes.STRING,
//           allowNull:false  
//         },
//         isPremiorUser:DataTypes.BOOLEAN,
//         total_amount:{
//          type: DataTypes.INTEGER,
//          defaultValue:0
//         }


//     }

// )


// module.exports=users;



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    const userSchema = new Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      isPremiorUser:Boolean,
      total_amount:{
         type: Number,
         default:0
      }

    },{timestamps:true});


    const User=mongoose.model("User",userSchema);
    module.exports=User;