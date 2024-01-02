require("./config/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "*", 
  methods: ["POST", "GET", "OPTIONS"], 
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome");
});

const userRoute = require("./Routers/userRoute");
app.use("/user", userRoute);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, function () {
  console.log("listen");
});