
const { Op } = require("sequelize");
const ExpenseModel=require("../models/ExpenseModel");
const DownloadedExpenseModel=require("../models/downloadExpenseModel.js")
const { awsS3Services } = require("../services/awsS3Services");

const sequelize = require("../utils/database");
const addExpense=async(req,res)=>{
    // const transaction=await sequelize.transaction();
    const {expenseAmount,description,category}=req.body;
            try {
                const expense=await ExpenseModel({expenseAmount,description,category,userId:req.user.id});
                await expense.save();
                req.user.total_amount=Number(req.user.total_amount) + Number(expenseAmount);
                await req.user.save();
                // await transaction.commit();
                res.status(201).json({success:true,message:"Expense created successfully",expense})
            } catch (error) {
                // await transaction.rollback();
                res.send(error)
            }
}
        const getExpense=async(req,res)=>{
            const {page,limit}=req.query;
            // const transaction=await sequelize.transaction();
            try {
                const expenses=await ExpenseModel.find({userId:req.user._id})
                .limit(limit)
                .skip((page-1)*5)
                .sort({ createdAt: -1 });
                const expenseTotalCount=await ExpenseModel.countDocuments({userId:req.user._id});
                    

                // await transaction.commit();
                res.status(200).json({success:true,message:"Expense fetched successfully",expenses:expenses,total:expenseTotalCount})
                
            } catch (error) {
                // await transaction.rollback();
                res.send(error)
                
            }
        }
        const deleteExpense=async(req,res)=>{
            // const transaction=await sequelize.transaction();
            const {id}=req.params;
        try {
            const expense=await ExpenseModel.findById(id);            
            req.user.total_amount=Number(req.user.total_amount)-Number(expense.expenseAmount);
            req.user.save();
            await ExpenseModel.deleteOne({_id:id});
            // await transaction.commit();
            res.status(200).json({message:"Expense Deleted Successfully",success:true})
        } catch (error) {
            // await transaction.rollback();
                res.send(error)
        }
        }

        const downloadExpenses=async(req,res)=>{            
            try {
                const expenses=await ExpenseModel.find({userId:req.user._id});
                if(!expenses.length){
                   return res.status(404).json({message:"Expenses not found"})
                }
                const stringifyExpense=JSON.stringify(expenses);
                const filename=`expense${req.user.id}/${new Date()}.txt`
                
                const fileUrl= await awsS3Services(stringifyExpense,filename);
                
                const downloadedExpense=await DownloadedExpenseModel({
                     file:fileUrl,
                     userId:req.user._id
                });
                await downloadedExpense.save();
                res.status(200).json({success:true,fileUrl})
            } catch (error) {
                console.log(error);
                
            }
        }

        const getDownloadExpense=async(req,res)=>{
            try {
                const downloadedExpense=await DownloadedExpenseModel.find({     
                        userId:req.user._id   
                })
                .limit(5)
                .sort({createdAt:-1})
               
                res.status(200).json({success:true,downloadedExpense})
                
            } catch (error) {
                console.log(error);
                
                res.status(500).json({success:false})
            }
        }


module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpenses,
    getDownloadExpense
}