const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const PaymentModel = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    orderAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    orderCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR",
    },

    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
    },
  }
);

module.exports = PaymentModel;