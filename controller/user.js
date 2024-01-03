
const nodemailer = require("nodemailer");
const express = require("express")
const cors = require("cors");
const { user } = require("../models/user");

appregister = express()
appregister.use(express.json())
appregister.use(express())
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
appregister.use(cors({ maxAge: 24 * 60 * 60 * 1000, origin: "https://www.lvw.live", exposedHeaders: '*', credentials: true, preflightContinue: true }));

appregister.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://www.lvw.live');
    res.header({ "Access-Control-Allow-Credentials": true });
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
    res.header("Access-Control-Max-Age", 24 * 60 * 60 * 1000);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")

    next()
})



appregister.post("/addnew", async (req, res, next) => {
    const { role, firstName, lastName, email, phone } = req.body
    if (!firstName) {
        res.status(400).json({ message: "First Name is required" })
    }
    else if (!lastName) {
        res.status(400).json({ message: "Last Name is required" })
    }
    else if (!email) {
        res.status(400).json({ message: "Email is required" })
    }
    else if (!phone) {
        res.status(400).json({ message: "Phone is required" })
    }
    else {
        const userData = new user({
            role: role,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        })
        console.log(userData)
        const newuser = await userData.save()
        sendWelcomeEmail(newuser)
        res.send(newuser)
    }
    next()


}, async (req, res) => {


}

)
module.exports.appregister = appregister;
