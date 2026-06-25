const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/database.js")


const DownloadedExpense=sequelize.define(
    'DownloadedExpense',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        file:{
          type:DataTypes.STRING,
          allowNull:false ,

        },
       
    }

)


module.exports=DownloadedExpense;