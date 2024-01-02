const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB, closeDB } = require("./config/connection"); // Update the path based on your file structure
const port = process.env.PORT || 5000
const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://lvw.onrender.com", // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
// Add this before your route handlers
app.options("*", cors());
app.use(bodyParser.json());

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Set up routes after connecting to the database

    app.get("/", function (req, res) {
      res.send("Welcome");
    });

    const userRoute = require("./Routers/userRoute");
    app.use("/user", userRoute);

    // Handle 404 - Not Found
    app.use((req, res, next) => {
      res.status(404).send("404 - Not Found");
    });

    // Handle 500 - Internal Server Error
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("500 - Internal Server Error");
    });

    // Start the server
    server.listen(port, function () {
      console.log("Server listening on port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // You might want to handle the error in a way appropriate for your application
  });

// Close the MongoDB connection when your application is terminated
process.on("SIGINT", () => {
  closeDB().finally(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  closeDB().finally(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});