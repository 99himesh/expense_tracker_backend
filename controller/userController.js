const Users = require("../models/userModel");
const {ObjectId}=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const sequelize = require("../utils/database");
const { where } = require("sequelize");
const { transPorter } = require("../services/nodemailerService");

const generatejwtToken=async(_id,name)=>{
    console.log(_id,name);
    
   return await jwt.sign({ _id: _id,name:name }, process.env.JWT_SECRET_KEY); 
}

const signUp=async(req,res)=>{
// const transaction=await sequelize.transaction();
    try {
        const {name,email,password}=req.body;
        const userExist=await Users.find({email:email});
        console.log(userExist);
        
        if(userExist.length){
            return res.status(409).send("User already exist")
        }
        bcrypt.hash(password, 10,async function(err, hash) {
          if(err){
            throw new Error("Something went wrong!")
          }
            
        const user=await Users({name,email,password:hash});
        user.save()
        // await transaction.commit();
        res.status(201).json({success:true,user,message:"User created successfully"})
        });
        
        
    } catch (error) {
        // await transaction.rollback();
        console.log(error);
        
        res.status(500).json(error)
        
    }
}


const logIn=async(req,res)=>{
// const transaction=await sequelize.transaction();

    try {
        const {email,password}=req.body;
        const user=await Users.find({
                email:email   
        });
        
        if(!user.length){
           return res.status(404).send("User not exist");
        }
       
        bcrypt.compare(password,user[0]?.password,async(err,result)=>{  
              if(err){
               throw new Error("Something went wrong!")
             }         
            if(result){ 
            //   await transaction.commit() 
              res.status(200).json({success:true,user,token:await generatejwtToken(user[0]._id,user[0].name),message:"User Login successfully"})
             }else{
             return res.status(401).send("User not authorized");
            }

        })
        
    } catch (error) {
        // await transaction.rollback()
        res.status(500).json(error.message)
        
    }
 }


    const getAllUser=async(req,res)=>{
    // const transaction=await sequelize.transaction();

        try {
            const user=await Users.find().limit(5);
            // transaction.commit();
            res.status(200).json({success:true,message:"Users Fetch successfully",user});
        } catch (error) {
            // transaction.rollback();
            res.status(500).send(error.message)
        }

    }


    const sendforgetPasswordLink=async(req,res)=>{        
            try {
            const {email}=req.body;
            
            const user=await Users.find({email:email});
            if(!user.length){
                res.status(404).json({message:"User not found"});
            }
            const token=await jwt.sign({id:user[0]._id},process.env.JWT_PASSWORD_SECRETKEY,{expiresIn:"15m"});
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
            res.status(200).json({success:true,message:"Reset link sent"})
            } catch (error) {
                 console.log(error);
                 
            }
    }


     const setNewPassword=async(req,res)=>{
        console.log("dfsdf");
        
            try {
                const {token}=req.headers;
                const {password}=req.body; 
                const decode=await jwt.verify(token,process.env.JWT_PASSWORD_SECRETKEY);
                const user = await Users.findById(decode.id);                
                if(!user){
                res.status(404).json({message:"User not found"});
                }
                const hashedPassword=await bcrypt.hash(password,10)
                 user.password=hashedPassword;
                 user.save();
                 res.status(200).json({success:true,message:"Password update suucessfully"})  
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