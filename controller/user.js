
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
            attachments: [{
                filename: 'logo.png',
                path: logoURL,
                cid: 'logo'
            }],
            html: `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
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

      body {
        font-family: "Lato", sans-serif;
        background-color: #12243a;
        height: 100vh;
      }

      .container {
        width: 85%;
        margin: 0 auto;
      }

      .figure {
        display: flex;
        justify-content: center;
        padding: 60px 0;
      }

      .figure > img {
        max-width: 100%;
        height: auto;
      }

      .container > h1 {
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        color: #ffffff;
      }

      .container > p {
        color: #ffffff;
        font-weight: unset;
        font-size: 25px;
      }

      .first__of__type {
        margin-top: 50px;
        margin-bottom: 30px;
      }

      .last__of__type {
        margin-bottom: 50px;
      }

      .container > h2 {
        color: #ffffff;
        font-weight: 100;
        line-height: 33px;
      }

      footer {
        margin-top: 52px;
        background-color: #ff2629;
        /* height: 207px; */
        padding: 75px 0;
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      .footer__icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .left__side i {
        font-size: 23px;
        margin-right: 20px;
        cursor: pointer;
      }

      .right__side i {
        font-size: 30px;
        border: 1px solid #ffffff;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
      }

      .mailto {
        margin-right: 10px;
      }

      @media (max-width: 1100px) {
        footer {
          padding: 60px 0;
        }
      }
  
      @media (max-width: 1000px) {
        .container>h1 {
          font-size: 30px;
        }
  
        .container>p {
          font-size: 20px;
        }
      }
  
      @media (max-width: 800px) {
        .container>h1 {
          font-size: 28px;
        }
  
        .container>p {
          font-size: 16px;
        }
  
        .container>h2 {
          font-size: 20px;
        }
      }
  
      @media (max-width: 600px) {
        footer {
          padding: 50px 0;
        }
      }
  
      @media (max-width: 500px) {
        .container>h1 {
          font-size: 22px;
        }
  
        .container>p {
          font-size: 13px;
        }
  
        .container>h2 {
          font-size: 16px;
        }
  
        .right__side svg {
          width: 50px !important;
        }
        .right__side > a > .mailto{
          margin-right: 5px !important;
        }
      }
  
      @media (max-width: 400px) {
        .container>h1 {
          font-size: 18px;
        }
  
        .container>p {
          font-size: 13px;
        }
  
        .container>h2 {
          font-size: 16px;
        }
      }
  
      @media (max-width: 351px) {
        .container>h1 {
          font-size: 15px;
        }
  
        .container>p {
          font-size: 13px;
        }
  
        .container>h2 {
          font-size: 16px;
        }
  
        .left__side > a > svg {
          width: 20px !important;
          margin-right: 10px !important;
        }
        .left__side > a > .facebook {
          width: 14px !important;
        }
        .left__side > a > .youtube {
          width: 23px !important;
          margin-right: 0px !important;
        }
        .right__side > a > svg {
          width: 40px !important;
          margin-right: 10px !important;
        }
      }
    </style>
  </head>

  <body style="background-color: #12243a;">
    <div class="main">
      <div class="container">
        <figure class="figure">
          <img src="cid:logo" alt="Live Virtual World" />
        </figure>
        <h1>Welcome to the LVW Tours Community!</h1>
        <p class="first__of__type">
          Welcome to LVW Tours – your gateway to unforgettable live journeys!
        </p>
        <p class="last__of__type">
          We've received your information, and you'll be the first to know about
          our upcoming launch. Get ready for exclusive updates as we embark on
          this journey together.
        </p>
        <h2>
          Sincerely,<br />
          LVW Team
        </h2>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="footer__icons">
        <div class="left__side">
        <a href="https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498"
          target="_blank"><svg class="facebook" style="width:16px; margin-right:16px;" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512">
            <path fill="#ffffff"
              d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
          </svg></a>
        <a href="https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA==" target="_blank"><svg
            style="width:23px; margin-right:16px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#ffffff"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg></a>
        <a href="https://www.linkedin.com/company/live-virtual-world" target="_blank"><svg
            style="width:23px; margin-right:13px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#ffffff"
              d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg></a>
        <a href="https://www.youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W" target="_blank"><svg class="youtube"
            style="width:28px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="#ffffff"
              d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
          </svg></a>
      </div>
      <div class="right__side">
        <a href="mailto:Info@lvw.live"><svg
            style="width:50px; margin-right:13px; border:1px solid #ffffff; padding:10px; border-radius:40%;"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#ffffff"
              d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </svg></a>
        <a href="https://www.lvw.live/" target="_blank"><svg style="width:50px; border:1px solid #ffffff; padding:10px; border-radius:40%;" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="#ffffff"
              d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
          </svg></a>
      </div>
        </div>
      </div>
    </footer>
  </body>
</html>
            `,
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
