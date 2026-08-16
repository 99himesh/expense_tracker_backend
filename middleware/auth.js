const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel");



const authenticate=async(req,res,next)=>{
    
    try {
        const token=req.header("Authorization");
        console.log(token,"token");
         
        const user=await jwt.verify(token,process.env.JWT_SECRET_KEY) ;
        console.log(user,"user");
               
         const userData=await UserModel.find({_id:user._id});
         req.user=userData[0];         
         next();
         
    } catch (error) {
       return res.status(401).json({success:false}) 
    }
}

module.exports={
    authenticate
}


















