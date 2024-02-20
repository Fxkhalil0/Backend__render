
const nodemailer = require("nodemailer");
const express = require("express")
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { user } = require("../models/user");

appregister = express()
appregister.use(express.json())
appregister.use(express())
appregister.use(express.static(path.join(__dirname, "../uploads")));
appregister.use(express.static("./uploads"));
const fileStorage = multer.diskStorage({
    destination: (req, file, callbackfun) => {
        callbackfun(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname.replaceAll(" ", ""));
    },
});
const upload = multer({ storage: fileStorage });
const logoURL = '../uploads/logo.png'
const facebookURL = '../uploads/facebook.png'
const instagramURL = '../uploads/instagram.png'
const linkedinURL = '../uploads/linked.png'
const youtubeURL = '../uploads/youtube.png'
const emailURL = '../uploads/email.png'
const webURL = '../uploads/web.png'

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
async function sendUserWelcomeEmail(userData) {
  try {
      fs.readFile(path.join(__dirname, "../index.html"), { encoding: "utf-8" }, function (err, html) {
          if (err) {
              console.error("Error reading HTML file:", err);
              return;
          }

          // Create mail options
          const mailOptions = {
            from: '"LVW Tours" <fatmakhalilba@gmail.com>',
            to: userData.email,
            subject: "Welcome to LVW Tours Community",
            attachments: [
                {
                filename: 'logo.png',
                path: logoURL,
                cid: 'logo'
            },
                {
                filename: 'facebook.png',
                path: facebookURL,
                cid: 'face'
            },
                {
                filename: 'instagram.png',
                path: instagramURL,
                cid: 'insta'
            },
                {
                filename: 'linked.png',
                path: linkedinURL,
                cid: 'link'
            },
                {
                filename: 'youtube.png',
                path: youtubeURL,
                cid: 'you'
            },
                {
                filename: 'email.png',
                path: emailURL,
                cid: 'email'
            },
                {
                filename: 'web.png',
                path: webURL,
                cid: 'web'
            },
        ],
            html: html, // Use the HTML content read from index.html
          };

          // Send the email
          transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                  console.error("Error sending email:", error);
              } else {
                  console.log("Email sent: " + info.response);
              }
          });
      });
  } catch (error) {
      console.error("Error sending welcome email:", error);
  }
}
async function sendCareerWelcomeEmail(userData) {
    try {
        const info = await transporter.sendMail({
            from: '"LVW Tours" <fatmakhalilba@gmail.com>',
            to: userData.email,
            subject: "Explore Your Career at LVW Tours",
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

appregister.post("/addnew", async (req, res, next) => {
    const { role, firstName, lastName, email, phone, birthDate } = req.body;
    if (!firstName) {
        res.status(400).json({ message: "First Name is required" });
    } else if (!lastName) {
        res.status(400).json({ message: "Last Name is required" });
    } else if (!email) {
        res.status(400).json({ message: "Email is required" });
    } else if (!birthDate && role == "user") {
        res.status(400).json({ message: "Birth Date is required" });
    } else {
        // Check if email already exists
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            // Email already registered
            res.status(400).json({ message: "Email already registered" });
        } else {
            const userData = new user({
                role: role,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                birthDate: new Date(birthDate),
            });
            console.log(userData);
            const newuser = await userData.save();
            if (newuser?.role === "user") {
                sendUserWelcomeEmail(newuser);
            } else {
                sendCareerWelcomeEmail(newuser);
            }
            res.send(newuser);
        }
    }
});
appregister.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://www.lvw.live');
    res.header({ "Access-Control-Allow-Credentials": true });
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
    res.header("Access-Control-Max-Age", 24 * 60 * 60 * 1000);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")

    next()
})

module.exports.appregister = appregister;
