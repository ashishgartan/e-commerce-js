const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
  const filePath = path.join(__dirname, "../database/categories.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to load categories" });
    const categories = JSON.parse(data);
    res.json(categories);
  });
});
router.get("/:id", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to load categories" });
    const categories = JSON.parse(data);
    const id = parseInt(req.params.id);
    const category = categories.find((cat) => cat.id === id);
    if (!category) {
      return res.status(404).json({ error: "category not find" });
    }
    res.json(category);
  });
});

module.exports = router;
