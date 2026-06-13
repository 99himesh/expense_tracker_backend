const Users = require("../models/UserModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const generatejwtToken=async(userId,name)=>{
   return await jwt.sign({ userId: userId,name:name }, process.env.SECRET_KEY); 
}

const signUp=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const userExist=await Users.findAll({where:{email:email}});
        if(userExist.length){
            return res.status(409).send("User already exist")
        }
        bcrypt.hash(password, 10,async function(err, hash) {
          if(err){
            throw new Error("Something went wrong!")
          }
            
        const user=await Users.create({name,email,password:hash});
        res.status(201).json({user,message:"User created successfully"})
        });
        
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
        
    }
}


const logIn=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Users.findAll({
            where:{
                email:email
            }
        });
        
        if(!user.length){
           return res.status(404).send("User not exist");
        }
       
        bcrypt.compare(password,user[0]?.password,async(err,result)=>{  
              if(err){
               throw new Error("Something went wrong!")
             }         
            if(result){  
              res.status(200).json({user,token:await generatejwtToken(user[0].id,user[0].name),message:"User Login successfully"})
             }else{
             return res.status(401).send("User not authorized");
            }

        })
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }
}



module.exports={
    signUp,
    logIn
};