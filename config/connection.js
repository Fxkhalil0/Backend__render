const { MongoClient } = require('mongodb');

// Connection URI for MongoDB Atlas (replace with your actual connection string)
const uri = 'mongodb+srv://lvw:LVW123456789@cluster0.9bdwe65.mongodb.net/Project?retryWrites=true&w=majority';

// Options for the MongoClient
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a new MongoClient
const client = new MongoClient(uri, options);

// Function to connect to the MongoDB database
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
}

// Function to close the MongoDB connection
async function closeDB() {
  try {
    await client.close();
    console.log('Closed the MongoDB connection');
  } catch (error) {
    console.error('Error closing the MongoDB connection:', error);
  }
}

// Export the connection functions
module.exports = { connectDB, closeDB, client };