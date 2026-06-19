const Users = require("../models/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const sequelize = require("../utils/database");
const { where } = require("sequelize");
const { transPorter } = require("../services/nodemailerService");

const generatejwtToken=async(userId,name)=>{
   return await jwt.sign({ userId: userId,name:name }, process.env.JWT_SECRET_KEY); 
}

const signUp=async(req,res)=>{
const transaction=await sequelize.transaction();
    try {
        const {name,email,password}=req.body;
        const userExist=await Users.findAll({where:{email:email}},{transaction});
        if(userExist.length){
            return res.status(409).send("User already exist")
        }
        bcrypt.hash(password, 10,async function(err, hash) {
          if(err){
            throw new Error("Something went wrong!")
          }
            
        const user=await Users.create({name,email,password:hash},{transaction});
        await transaction.commit();
        res.status(201).json({user,message:"User created successfully"})
        });
        
        
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        
        res.status(500).json(error)
        
    }
}


const logIn=async(req,res)=>{
const transaction=await sequelize.transaction();

    try {
        const {email,password}=req.body;
        const user=await Users.findAll({
            where:{
                email:email
            }
        },{transaction});
        
        if(!user.length){
           return res.status(404).send("User not exist");
        }
       
        bcrypt.compare(password,user[0]?.password,async(err,result)=>{  
              if(err){
               throw new Error("Something went wrong!")
             }         
            if(result){ 
              await transaction.commit() 
              res.status(200).json({user,token:await generatejwtToken(user[0].id,user[0].name),message:"User Login successfully"})
             }else{
             return res.status(401).send("User not authorized");
            }

        })
        
    } catch (error) {
        await transaction.rollback()
        res.status(500).json(error.message)
        
    }
 }


    const getAllUser=async(req,res)=>{
    const transaction=await sequelize.transaction();

        try {
            const user=await Users.findAll({transaction});
            transaction.commit();
            res.status(200).json({success:true,message:"Users Fetch successfully",user});
        } catch (error) {
            transaction.rollback();
            res.status(500).send(error.message)
        }

    }


    const sendforgetPasswordLink=async(req,res)=>{        
            try {
            const {email}=req.body;
            
            const user=await Users.findOne({where:{email:email}});
            if(!user){
                res.status(404).json({message:"User not found"});
            }
            const token=await jwt.sign({id:user.id},process.env.JWT_PASSWORD_SECRETKEY,{expiresIn:"15m"});
            const link=`${process.env.VITE_BASE_URL}/new-password/${token}`;
              await transPorter.sendMail({
                from:process.env.GMAIL_TEXT,
                to:email,
                Subject:"RESET Password",
                html:
                `
                 <h2>Reset Password</h2>
                <a href="${link}">
                    Click Here
                </a>`
            });
            res.status(200).json({message:"Reset link sent"})
            } catch (error) {
                 console.log(error);
                 
            }
    }


     const setNewPassword=async(req,res)=>{
            try {
                const {token}=req.headers;
                const {password}=req.body;
               
                
                const decode=await jwt.verify(token,process.env.JWT_PASSWORD_SECRETKEY);
                
                const user=await  Users.findByPk(decode.id);
                if(!user){
                res.status(404).json({message:"User not found"});
                }
                const hashedPassword=await bcrypt.hash(password,10)
                 user.password=hashedPassword;
                 user.save();
                 res.status(200).json({message:"Password update suucessfully"})  
            } catch (error) {
               console.log(error);
                 
            }
    }
module.exports={
    signUp,
    logIn,
    getAllUser,
    sendforgetPasswordLink,
    setNewPassword
};