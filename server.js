const express = require("express");
const app = express();
const db = require("./db"); // Make sure this file handles the database connection
require('dotenv').config();

// Use express.json() instead of bodyParser
app.use(express.json()); // req.body
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});


// Import the router files
const perosnRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
// Use the routes
app.use('/person', perosnRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
