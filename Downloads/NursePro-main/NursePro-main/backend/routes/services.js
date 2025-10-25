const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all services
router.get("/", async (req, res) => {
  try {
    const [services] = await pool.promise().query("SELECT * FROM services");
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get service by ID
router.get("/:id", async (req, res) => {
  try {
    const [service] = await pool
      .promise()
      .query("SELECT * FROM services WHERE id = ?", [req.params.id]);

    if (service.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
