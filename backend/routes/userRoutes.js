const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../database/users.json");

function readUsers(res, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading users file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    try {
      const users = JSON.parse(data);
      callback(users);
    } catch (parseErr) {
      console.error("❌ Error parsing users file:", parseErr);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
// 🔍 GET /users/id/:id

router.get("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`🔎 Fetching user with ID ${id}`);

  readUsers(res, (users) => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      console.warn(`⚠️ User ID ${id} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });
});

module.exports = router;
