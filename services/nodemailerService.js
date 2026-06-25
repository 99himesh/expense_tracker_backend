const nodemailer = require("nodemailer");

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