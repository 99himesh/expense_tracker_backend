const nodemailer = require("nodemailer");
console.log(process.env.GMAIL_TEXT,"dfsdf");
console.log(process.env.GMAIL_APP_PASSWORD,"sdfdsfdsfs");


const transPorter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GMAIL_TEXT,
        pass:process.env.GMAIL_APP_PASSWORD
    }


})

module.exports={
    transPorter
}