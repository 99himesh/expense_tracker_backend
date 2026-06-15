
const ExpenseModel=require("../models/expenseModel");
const sequelize = require("../utils/database");
const addExpense=async(req,res)=>{
    const transaction=await sequelize.transaction();
    const {expenseAmount,description,category}=req.body;
            try {
                const expense=await ExpenseModel.create({expenseAmount,description,category,userId:req.user.id},{transaction});
                req.user.total_amount=Number(req.user.total_amount) + Number(expenseAmount);
                await req.user.save({transaction});
                await transaction.commit();
                res.status(201).json({success:true,message:"Expense created successfully",expense})
            } catch (error) {
                await transaction.rollback();
                res.send(error)
            }
}
        const getExpense=async(req,res)=>{
            const {page,limit}=req.query;
            const transaction=await sequelize.transaction();
            try {
                const expenses=await ExpenseModel.findAndCountAll({
                    where:{
                        userId:req.user.id,
                    },
                     limit:Number(limit),
                     offset:Number((page-1) * 5)
                
                },{transaction}
                );

                await transaction.commit();
                res.status(200).json({success:true,message:"Expense fetched successfully",expenses:expenses.rows,total:expenses.count})
                
            } catch (error) {
                await transaction.rollback();
                res.send(error)
                
            }
        }
        const deleteExpense=async(req,res)=>{
            const transaction=await sequelize.transaction();
            const {id}=req.params;
        try {
            const expense=await ExpenseModel.findByPk(id,{transaction});
            req.user.total_amount=Number(req.user.total_amount)-Number(expense.expenseAmount);
            req.user.save();
            await ExpenseModel.destroy({where:{id:id,userId:req.user.id}},{transaction});
            await transaction.commit();
            res.status(200).json({message:"Expense Deleted Successfully",success:true})
        } catch (error) {
            await transaction.rollback();
                res.send(error)
        }
        }


module.exports={
    addExpense,
    getExpense,
    deleteExpense
}