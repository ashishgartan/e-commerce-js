const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../database/users.json");
// Middleware to parse JSON body
router.use(express.json());
router.get("/:userId", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load users" });

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: "Invalid JSON format" });
    }

    const userId = parseInt(req.params.userId);
    console.log(userId);
    const user = users.find((u) => u.id == userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.cart || []);
  });
});

router.post("/:userId", (req, res) => {
  console.log(req.body);

  const userId = parseInt(req.params.userId);
//   console.log(userId);
  const newCart = req.body.items; // Expecting array like [{ productId, count }, ...]
  //   console.log(newCart);
  if (!Array.isArray(newCart)) {
    return res.status(400).json({ error: "Cart must be an array" });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to read users file" });

    let users;
    try {
      users = JSON.parse(data);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Invalid JSON format in users file" });
    }

    const user = users.find((u) => u.id === userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cart = newCart;
    // console.log(user.cart);
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save cart" });
      res.json({ message: "Cart updated successfully", cart: user.cart });
    });
  });
});
module.exports = router;
