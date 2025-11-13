const mysql = require("mysql2");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "123456", // Replace with your MySQL password
  database: "wazi_db", // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    console.log(
      "Please ensure MySQL server is running and the database 'wazi_db' exists."
    );
    console.log("You can create the database with: CREATE DATABASE wazi_db;");
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
