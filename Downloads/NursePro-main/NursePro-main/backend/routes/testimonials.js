const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const [testimonials] = await pool
      .promise()
      .query("SELECT * FROM testimonials");
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new testimonial
router.post("/", async (req, res) => {
  try {
    const { client_name, content, rating } = req.body;

    const [result] = await pool
      .promise()
      .query(
        "INSERT INTO testimonials (client_name, content, rating) VALUES (?, ?, ?)",
        [client_name, content, rating]
      );

    res.status(201).json({ message: "Testimonial added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
