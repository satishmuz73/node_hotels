const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'hotels' with your database name

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Correct option
    useUnifiedTopology: true
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});
db.on('error', (err) => {
    console.log('MongoDB connecting Error', err);
});
db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

// Export the database connection
module.exports = db;



