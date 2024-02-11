
const nodemailer = require("nodemailer");
const express = require("express")
const cors = require("cors");
const multer = require("multer");
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
const logoURL = '../uploads/logo.png'

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

      figure {
        display: flex;
        justify-content: center;
        padding: 60px 0;
      }

      figure > img {
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

      .container > p:first-of-type {
        margin-top: 50px;
        margin-bottom: 30px;
      }

      .container > p:last-of-type {
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

      .right__side i:first-of-type {
        margin-right: 10px;
      }

      @media (max-width: 1100px) {
        footer {
          padding: 60px 0;
        }
      }
      @media (max-width: 1000px) {
        .container > h1 {
          font-size: 30px;
        }
        .container > p {
          font-size: 20px;
        }
      }
      @media (max-width: 800px) {
        .container > h1 {
          font-size: 28px;
        }
        .container > p {
          font-size: 16px;
        }
        .container > h2 {
          font-size: 20px;
        }
      }
      @media (max-width: 600px) {
        footer {
          padding: 50px 0;
        }
      }
      @media (max-width: 500px) {
        .container > h1 {
          font-size: 22px;
        }
        .container > p {
          font-size: 13px;
        }
        .container > h2 {
          font-size: 16px;
        }
        .right__side i {
          font-size: 25px;
        }
      }
      @media (max-width: 400px) {
        .container > h1 {
          font-size: 18px;
        }
        .container > p {
          font-size: 13px;
        }
        .container > h2 {
          font-size: 16px;
        }
      }
      @media (max-width: 351px) {
        .container > h1 {
          font-size: 15px;
        }
        .container > p {
          font-size: 13px;
        }
        .container > h2 {
          font-size: 16px;
        }
        .left__side i {
          font-size: 20px;
          margin-right: 10px;
        }
        .right__side i {
          font-size: 20px;
        }
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div class="container">
        <figure>
          <img src="cid:logo" alt="Live Virtual World" />
        </figure>
        <h1>Welcome to the LVW Tours Community!</h1>
        <p>
          Welcome to LVW Tours – your gateway to unforgettable live journeys!
        </p>
        <p>
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
            <a
              href="https://www.facebook.com/story.php?story_fbid=406443851756849&substory_index=898726195041079&id=100071737136498"
              target="_blank"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
            <a
              href="https://www.instagram.com/live_virtual_world?igsh=MzRlODBiNWFlZA=="
              target="_blank"
              ><i class="fa-brands fa-instagram"></i
            ></a>
            <a
              href="https://www.linkedin.com/company/live-virtual-world"
              target="_blank"
              ><i class="fa-brands fa-linkedin-in"></i
            ></a>
            <a
              href="https://www.youtube.com/@livevirtualworld7827?si=EnL3pBzNfYYrxW8W"
              target="_blank"
              ><i class="fa-brands fa-youtube"></i
            ></a>
          </div>
          <div class="right__side">
            <a href="mailto:Info@lvw.live"
              ><i class="fa-regular fa-envelope"></i
            ></a>
            <a href="https://www.lvw.live/" target="_blank"
              ><i class="fa-solid fa-globe"></i
            ></a>
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
    next();
});

module.exports.appregister = appregister;
