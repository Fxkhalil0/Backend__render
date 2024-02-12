
const nodemailer = require("nodemailer");
const express = require("express")
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const { user } = require("../models/user");

appregister = express()
appregister.use(express.json())
appregister.use(express())
appregister.use(express.static(path.join(__dirname, "./uploads")));
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
const logoURL = './uploads/logo.png'
const facebookURL = './uploads/facebook.png'
const instagramURL = './uploads/instagram.png'
const linkedinURL = './uploads/linked.png'
const youtubeURL = './uploads/youtube.png'
const emailURL = './uploads/email.png'
const webURL = './uploads/web.png'

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
        const info = await transporter.sendMail({
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
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossorigin="anonymous" referrerpolicy="no-referrer" />
              <title>Email Temp</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
            
                a {
                  text-decoration: none;
                  color: #ffffff;
                }
            
                @media (max-width: 1100px) {
                  footer {
                    padding: 60px 0 !important;
                  }
                }
            
                @media (max-width: 1000px) {
                  .container>h1 {
                    font-size: 30px !important;
                  }
            
                  .container>p {
                    font-size: 20px !important;
                  }
                }
            
                @media (max-width: 800px) {
                  .container>h1 {
                    font-size: 28px !important;
                  }
            
                  .container>p {
                    font-size: 16px !important;
                  }
            
                  .container>h2 {
                    font-size: 20px !important;
                  }
                }
            
                @media (max-width: 600px) {
                  footer {
                    padding: 35px 0 !important;
                  }
                }
            
                @media (max-width: 500px) {
                  .container>h1 {
                    font-size: 22px !important;
                  }
            
                  .container>p {
                    font-size: 13px !important;
                  }
            
                  .container>h2 {
                    font-size: 16px !important;
                  }
            
                  footer {
                    padding: 50px 0 !important;
                  }
                }
            
                @media (max-width: 400px) {
                  .container>h1 {
                    font-size: 18px !important;
                  }
            
                  .container>p {
                    font-size: 13px !important;
                  }
            
                  .container>h2 {
                    font-size: 16px !important;
                  }
            
                  .email {
                    width: 45px !important;
                  }
            
                  .web {
                    width: 46.5px !important;
                  }
                }
            
                @media (max-width: 351px) {
                  .container>h1 {
                    font-size: 15px !important;
                  }
            
                  .container>p {
                    font-size: 13px !important;
                  }
            
                  .container>h2 {
                    font-size: 16px !important;
                  }
            
                  footer {
                    padding: 30px 0 !important;
                  }
            
                  .facebook {
                    width: 30px !important;
                  }
            
                  .instagram {
                    width: 19px !important;
                    margin-right: 13px !important;
                  }
            
                  .linkedin {
                    width: 19px !important;
                    margin-right: 11px !important;
                  }
            
                  .youtube {
                    width: 24px !important;
                    margin-top: 5px !important;
                  }
            
                  .email {
                    width: 40px !important;
                  }
            
                  .web {
                    width: 42.5px !important;
                  }
                }
              </style>
            </head>
            
            <body style="background-color: #12243a; height: 100vh; font-family: 'Lato', sans-serif;">
              <div class="main">
                <div class="container" style="width: 85%; margin: 0 auto;">
                  <div style="width: 100%; display:flex; justify-content:center; align-items:center; text-align:center; padding: 60px 0;">
                    <img style="max-width: 100%; height: auto;" src="cid:logo" alt="Live Virtual World" />
                  </div>
                  <h1 style="text-align: center; font-size: 40px; font-weight: 600; color: #ffffff;">Welcome to the LVW Tours Community!</h1>
                  <p style="color: #ffffff; font-weight: unset; font-size: 25px; margin-top: 50px; margin-bottom: 30px;">
                    Welcome to LVW Tours – your gateway to unforgettable live journeys!
                  </p>
                  <p style="color: #ffffff; font-weight: unset; font-size: 25px; margin-bottom: 50px;">
                    We've received your information, and you'll be the first to know about
                    our upcoming launch. Get ready for exclusive updates as we embark on
                    this journey together.
                  </p>
                  <h2 style="color: #ffffff; font-weight: 100; line-height: 33px;">
                    Sincerely,<br/>
                    LVW Team
                  </h2>
                </div>
              </div>
              <footer style="margin-top: 52px; background-color: #ff2629; padding: 52px 0; position: absolute; bottom: 0; width: 100%;">
                <div class="container" style="width: 85%; margin: 0 auto;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div class="left__side" style="width: 80%; display:flex; align-items:center;">
                      <a href="https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498"
                        target="_blank"><img class="facebook" style="width: 40px;" src="cid:face" /></a>
                      <a href="https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA==" target="_blank"><img
                          class="instagram" style="width: 25px; margin-right: 15px; margin-top: 8px;" src="cid:insta" /></a>
                      <a href="https://www.linkedin.com/company/live-virtual-world" target="_blank"><img class="linkedin"
                          style="width: 25px; margin-right: 13px; margin-top: 8px;" src="cid:link" /></a>
                      <a href="https://www.youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W" target="_blank"><img
                          class="youtube" style="width: 30px; margin-top: 7px;" src="cid:you" /></a>
                    </div>
                    <div class="right__side" style="width: 20%; display:flex; align-items:center; justify-content: center;">
                      <a style="border: 1px solid #ffffff; border-radius: 50%; margin-right: 10px;margin-top: -4px; margin-bottom: 9px;" href="mailto:Info@lvw.live"><img
                          class="email" style="width: 55px; padding: 10px; margin-top: 7px;" src="cid:email" /></a>
                      <a style="border: 1px solid #ffffff; border-radius: 50%;margin-top: -4px; margin-bottom: 9px;" href="https://www.lvw.live/" target="_blank"><img
                          class="web" style="width: 55px; padding: 10px; margin-bottom: -5px;" src="cid:web" /></a>
                    </div>
                  </div>
                </div>
              </footer>
            </body>
            
            </html>`,
        });

        console.log("Welcome email sent to: %s", userData?.email);
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
