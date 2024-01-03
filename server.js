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