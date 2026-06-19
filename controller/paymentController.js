
const PaymentModel = require("../models/PaymentModel");
const Users = require("../models/userModel");
const {createOrderInCashfree, getPaymentStatus}=require("../services/cashfreeServics");
const sequelize = require("../utils/database");
const createOrders=async(req,res)=>{
    const transaction=await sequelize.transaction();
    try {
        const response=await createOrderInCashfree(
             `Order-${Date.now()}`,
               123,
              "INR",
              req.user.id,
              9898767660
        );        
        await PaymentModel.create({
           orderId: response.orderId,
           orderAmount:123,
           customerId:req.user.id,
           orderCurrency:"INR",
           customerPhone:"9898767660",
           paymentId:response.payment_session_id,
           orderStatus:"Pending"
        },{transaction});
        transaction.commit();
        res.status(200).json({orderId:response.orderId,paymentSessionId:response.payment_session_id,success:true,message:"Order created successfully"}) 
    } catch (error) {
        transaction.rollback();
        console.log(error);
        
    }
}
        const getPaymentDetails=async(req,res)=>{
            const {id}=req.params;
            const transaction=await sequelize.transaction();
            try {
                const paymentStatus=await getPaymentStatus(id);
                
                const payment=await PaymentModel.findAll({where:{orderId:id}},{transaction})
                if(!payment.length){
                res.status(404).send("payment not found")
                }
                payment[0].orderStatus=paymentStatus;
                await payment[0].save({transaction});
                req.user.isPremiorUser=true;
                await req.user.save({transaction});
                await transaction.commit();
                res.status(200).json({payment,success:true,message:"Payment fetched successfully"})
            } catch (error) {
                await transaction.rollback();
                console.log(error);
            }
        }

        const getUser=async(req,res)=>{
            
            try {
             res.status(200).json({success:true,message:"User fetch successfully",user:req.user});
             
            } catch (error) {
                res.status(500).send(error.message)
            }
        }


module.exports={
    createOrders,getPaymentDetails,getUser
}