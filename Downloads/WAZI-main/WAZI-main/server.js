const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/solution", (req, res) => {
  res.render("solution");
});

app.get("/data", (req, res) => {
  res.render("data");
});

app.get("/engage", (req, res) => {
  res.render("engage");
});

// Example route to fetch data from MySQL
app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM your_table", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Start server
app.listen(3002, () => {
  console.log(`Server is running on http://localhost:3002`);
});
