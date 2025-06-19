const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../database/users.json");

// Middleware to parse JSON
router.use(express.json());

/**
 * 📦 GET /:userId - Fetch cart for a specific user
 */
router.get("/:userId", (req, res) => {
  console.log("📥 Received request to fetch cart for user");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading users file:", err.message);
      return res.status(500).json({ error: "Failed to load users" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      console.error("🚫 Invalid JSON format in users file");
      return res.status(500).json({ error: "Invalid JSON format" });
    }

    const userId = parseInt(req.params.userId);
    console.log(`🔍 Searching for user with ID: ${userId}`);

    const user = users.find((u) => u.id === userId);

    if (!user) {
      console.warn(`⚠️  User with ID ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ Cart fetched successfully:", user.cart || []);
    res.json(user.cart || []);
  });
});

/**
 * 📤 POST /:userId - Update cart for a specific user
 */
router.post("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const newCart = req.body.items;

  console.log(`📤 Received cart update for user ID: ${userId}`);
  console.log("🛒 Incoming cart items:", newCart);

  if (!Array.isArray(newCart)) {
    console.warn("🚫 Cart update failed: Cart is not an array");
    return res.status(400).json({ error: "Cart must be an array" });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Failed to read users file:", err.message);
      return res.status(500).json({ error: "Failed to read users file" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      console.error("🚫 Invalid JSON in users file");
      return res
        .status(500)
        .json({ error: "Invalid JSON format in users file" });
    }

    const user = users.find((u) => u.id === userId);
    if (!user) {
      console.warn(`⚠️  Cannot update cart: User with ID ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    user.cart = newCart;

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("❌ Failed to write updated cart to file:", err.message);
        return res.status(500).json({ error: "Failed to save cart" });
      }

      console.log(
        "✅ Cart updated and saved successfully for user ID:",
        userId
      );
      res.json({ message: "Cart updated successfully", cart: user.cart });
    });
  });
});

module.exports = router;
