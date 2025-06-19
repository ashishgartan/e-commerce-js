const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../database/categories.json");

/**
 * 📦 GET / - Fetch all categories
 */
router.get("/", (req, res) => {
  console.log("📥 Request received: Fetch all categories");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Failed to read categories file:", err.message);
      return res.status(500).json({ error: "Failed to load categories" });
    }

    try {
      const categories = JSON.parse(data);
      console.log(`✅ Loaded ${categories.length} categories`);
      res.json(categories);
    } catch (parseError) {
      console.error("🚫 Error parsing categories.json:", parseError.message);
      return res.status(500).json({ error: "Invalid JSON in categories file" });
    }
  });
});

/**
 * 🔍 GET /:id - Fetch category by ID
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📥 Request received: Fetch category with ID ${id}`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Failed to read categories file:", err.message);
      return res.status(500).json({ error: "Failed to load categories" });
    }

    try {
      const categories = JSON.parse(data);
      const category = categories.find((cat) => cat.id === id);

      if (!category) {
        console.warn(`⚠️ Category with ID ${id} not found`);
        return res.status(404).json({ error: "Category not found" });
      }

      console.log(`✅ Category found: ${category.name || "Unnamed Category"}`);
      res.json(category);
    } catch (parseError) {
      console.error("🚫 Error parsing categories.json:", parseError.message);
      return res.status(500).json({ error: "Invalid JSON in categories file" });
    }
  });
});

module.exports = router;
