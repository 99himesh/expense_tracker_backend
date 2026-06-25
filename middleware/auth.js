const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel");



const authenticate=async(req,res,next)=>{
    
    try {
        const token=req.header("Authorization"); 
        const user=await jwt.verify(token,process.env.JWT_SECRET_KEY)        
         const userData=await UserModel.findByPk(user.userId);
         req.user=userData;         
         next();
         
    } catch (error) {
       return res.status(401).json({success:false}) 
    }
}

module.exports={
    authenticate
}


















