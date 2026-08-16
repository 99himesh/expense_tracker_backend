// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../utils/database.js");

// const PaymentModel = sequelize.define(
//   "Payment",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },

//     orderId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },

//     orderAmount: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },

//     orderCurrency: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "INR",
//     },

//     customerId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     customerPhone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     paymentId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     orderStatus: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "PENDING",
//     },
//   }
// );

// module.exports = PaymentModel;





const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const paymentSchema=new Schema({
   orderId: {
      type: String,
      required:true,
      unique: true,
    },

    orderAmount: {
      type: Number,
       required:true,
    },

    orderCurrency: {
      type: String,
      required:true,
      default: "INR",
    },

    customerId: {
      type: String,
       required:true,
    },

    customerPhone: {
      type: String,
       required:true,
    },

    paymentId: {
      type: String,
       required:true,
    },

    orderStatus: {
      type: String,
      required:true,
      default: "PENDING",
    },
});

const Payment=mongoose.model("Payment",paymentSchema);

module.exports=Payment;