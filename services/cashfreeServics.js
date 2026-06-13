const {Cashfree, CFEnvironment}=require("cashfree-pg");
const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");

const createOrderInCashfree=async(
   orderId,
    orderAmount,
    orderCurrency,
    customerId,
    customerPhone
)=>{
   try {
console.log(orderId,"sdfsdf");

    const expiryDate=new Date(Date.now()+60*60*1000);
    const formatedDate=expiryDate.toISOString();

    const request = {
            order_amount:orderAmount,
            order_currency: orderCurrency,
            order_id:orderId,
            customer_details: {
                customer_id: customerId.toString(),
                customer_phone: customerPhone.toString()
            },
            order_meta: {
                return_url: `http://localhost:5173/payment-status/${orderId}`,
                payment_methods: "cc,dc,upi"
            },
            order_expiry_time:formatedDate
     };

       const res=await cashfree.PGCreateOrder(request);
       
       return {payment_session_id:res.data.payment_session_id,orderId:orderId};
        
   } catch (error) {
    console.log(error,"Error");
    
   }
}

const getPaymentStatus=async(orderId)=>{
    try {
        const paymentStatus=await cashfree.PGOrderFetchPayments(orderId);        
        return paymentStatus.data[0].payment_status;
    } catch (error) {
       console.log(error);
        
    }
}

module.exports={
    createOrderInCashfree,
    getPaymentStatus
}