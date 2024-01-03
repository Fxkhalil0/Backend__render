require("./config/connection");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require('mongodb');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header({ "Access-Control-Allow-Credentials": true });
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
  res.header("Access-Control-Max-Age", 24 * 60 * 60 * 1000);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")

  next()
})
// app.use(
//   cors({
//     origin: "https://lvw.onrender.com", // Allow requests only from this origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   })
// );

app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Welcome");
});

// CORS middleware for specific routes
app.use("/user", cors({
  origin: "https://lvw.onrender.com",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
const userRoute = require("./Routers/userRoute");
app.use("/user", userRoute);


// Middleware to establish MongoDB connection
app.use(async (req, res, next) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    req.dbClient = client; // Attach the MongoDB client to the request object
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Close MongoDB connection after handling all requests
app.use((req, res) => {
  if (req.dbClient) {
    req.dbClient.close();
  }
  res.status(404).send('Not Found');
});



server.listen(port, function () {
  console.log("listen");
});