
const { Op } = require("sequelize");
const ExpenseModel=require("../models/ExpenseModel");
const DownloadedExpenseModel=require("../models/downloadExpenseModel.js")
const { awsS3Services } = require("../services/awsS3Services");

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
                        userId:req.user.id
                    },

                     limit:Number(limit),
                     offset:Number((page-1) * 5),
                     order:[["createdAt","desc"]]
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

        const downloadExpenses=async(req,res)=>{            
            try {
                const expenses=await ExpenseModel.findAll({where:{userId:req.user.id}});
                if(!expenses.length){
                   return res.status(404).json({message:"Expenses not found"})
                }
                const stringifyExpense=JSON.stringify(expenses);
                const filename=`expense${req.user.id}/${new Date()}.txt`
                
                const fileUrl= await awsS3Services(stringifyExpense,filename);
                
                await DownloadedExpenseModel.create({
                     file:fileUrl,
                     userId:req.user.id
                });
                res.status(200).json({success:true,fileUrl})
            } catch (error) {
                console.log(error);
                
            }
        }

        const getDownloadExpense=async(req,res)=>{
            try {
                const downloadedExpense=await DownloadedExpenseModel.findAll({
                    where:{
                        userId:req.user.id
                    },
                    limit:5,
                    order:[["createdAt","desc"]]
                });
               
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