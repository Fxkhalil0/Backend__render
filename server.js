require("./config/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  {
      origin: ["https://lvw.onrender.com/"],
      methods: ["POST", "GET"],
      credentials: true
  }
));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome");
});

const userRoute = require("./Routers/userRoute");
app.use("/user", userRoute);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(5000, function () {
  console.log("listen");
});