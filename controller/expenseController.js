
const ExpenseModel=require("../models/ExpenseModel")
const addExpense=async(req,res)=>{
    const {expenseAmount,description,category}=req.body;
            try {
                const expense=await ExpenseModel.create({expenseAmount,description,category});
                res.status(201).json({success:true,message:"Expense created successfully",expense})
            } catch (error) {
                res.send(error)
            }
}
const getExpense=async(req,res)=>{
    try {
        const expenses=await ExpenseModel.findAll({});
        res.status(200).json({success:true,message:"Expense fetched successfully",expenses})
        
    } catch (error) {
         res.send(error)
        
    }
}
const deleteExpense=async(req,res)=>{
    const {id}=req.params;
   try {
      const deleteExpense=await ExpenseModel.destroy({where:{id:id}});
      res.status(200).json({message:"Expense Deleted Successfully",success:true})
   } catch (error) {
         res.send(error)
    
   }
}


module.exports={
    addExpense,
    getExpense,
    deleteExpense
}