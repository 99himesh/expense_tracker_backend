
const PaymentModel = require("../models/PaymentModel");
const {createOrderInCashfree, getPaymentStatus}=require("../services/cashfreeServics")
const createOrders=async(req,res)=>{
    // const 
    try {
      
        
        const response=await createOrderInCashfree(
             `Order-${Date.now()}`,
              123,
              "INR",
             req.user.id,
             9898767660
        );
        console.log(response,"fvfsvd");
        
        await PaymentModel.create({
           orderId: response.orderId,
           orderAmount:123,
           customerId:req.user.id,
           orderCurrency:"INR",
           customerPhone:"9898767660",
           paymentId:response.payment_session_id,
           orderStatus:"Pending"
        });
        res.status(200).json({orderId:response.orderId,paymentSessionId:response.payment_session_id,success:true,message:"Order created successfully"})

        
    } catch (error) {
        console.log(error);
        
    }
}
        const getPaymentDetails=async(req,res)=>{
            const {id}=req.params;
            try {
                const paymentStatus=await getPaymentStatus(id);
                console.log(paymentStatus,"pdcnsdjcjs");
                
                const payment=await PaymentModel.findAll({where:{orderId:id}})
                if(!payment.length){
                res.status(404).send("payment not found")
                }
                payment[0].orderStatus=paymentStatus;
                payment[0].save();
                res.status(200).json({payment,success:true,message:"Payment fetched successfully"})
            } catch (error) {
                console.log(error);
            }
        }


module.exports={
    createOrders,getPaymentDetails
}