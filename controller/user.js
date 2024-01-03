const user = require("../models/user");
const nodemailer = require("nodemailer");

//nodemailer welcome message
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "fatmakhalilba@gmail.com",
        pass: "hwnaxnvdgdebkrba",
    },
});

// Function to send a welcome email
async function sendWelcomeEmail(userData) {
    try {
        const info = await transporter.sendMail({
            from: '"LVW Tours" <fatmakhalilba@gmail.com>',
            to: userData.email,
            subject: "Welcome to LVW Tours Community",
            html: `
            <h1>Hey ${userData?.firstName} ${userData?.lastName}, thanks for your interest!</h1>
            <h3>We've added you to our little email list, which means you'll be among the first to know when the site officially launches. We understand your excitement about exploring virtual travel,<br>
            so we'll be working pretty hard to get it into your hands soon.<br>
            In the meantime, you can follow <b><u>@LVWtrip on Twitter</u></b>. Or even better, help us spread the word!</h3>
            <h2>Sincerely,
            <br>
            LVW</h2>
            `,
        });

        console.log("Welcome email sent to: %s", userData?.email);
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
}


const add = async (req,res)=>{
    const {role,firstName,lastName,email,phone} = req.body
    if(!firstName){
        res.status(400).json({message:"First Name is required"})
    }
    else if(!lastName){
        res.status(400).json({message:"Last Name is required"})
    }
    else if(!email){
        res.status(400).json({message:"Email is required"})
    }
    else if(!phone){
        res.status(400).json({message:"Phone is required"})
    }
    else{
        
        const userData = await user.create({
            role:role,
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone
        })
        console.log(userData)
        sendWelcomeEmail(userData)
        res.status(200).json()
    }
}

module.exports = { add };