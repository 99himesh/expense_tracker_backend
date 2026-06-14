const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/database.js")


const users=sequelize.define(
    'users',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        name:{
          type:DataTypes.STRING,
          allowNull:false ,

        },
        email:{
          type:DataTypes.STRING,
          allowNull:false  ,
          unique:true 
        },
        password:{
          type:DataTypes.STRING,
          allowNull:false  
        },
        isPremiorUser:DataTypes.BOOLEAN,
        total_amount:{
         type: DataTypes.INTEGER,
         defaultValue:0
        }
        
        
    }

)


module.exports=users;