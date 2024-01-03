require("./config/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://lvw.onrender.com");
  res.header({ "Access-Control-Allow-Credentials": true });
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
  res.header("Access-Control-Max-Age", 24 * 60 * 60 * 1000);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")

  next()
})
app.use(
  cors({
    origin: "https://lvw.onrender.com", // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome");
});

const userRoute = require("./Routers/userRoute");
app.use("/user", userRoute);




server.listen(port, function () {
  console.log("listen");
});