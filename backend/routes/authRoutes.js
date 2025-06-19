const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const JWT_SECRET_KEY = "mykey";
const filePath = path.join(__dirname, "../database/users.json");

router.use(express.json());

// Helpers
const loadUsers = () => {
  console.log("🔄 Loading users from JSON file...");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const saveUsers = (users) => {
  console.log("💾 Saving updated users to JSON file...");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

// POST /login
router.post("/login", async (req, res) => {
  console.log("🚪 Login attempt received");
  console.log(req.body);
  const { username, password } = req.body;
  console.log(`📥 Received login for username: ${username}`);

  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user) {
    console.warn("❌ User not found!");
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.warn("🔐 Password mismatch!");
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  console.log(`✅ Login successful for user: ${username}`);
  console.log(`🔐 JWT generated with expiry 1h`);

  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// POST /signup
router.post("/signup", async (req, res) => {
  console.log("📝 Signup attempt received");

  const { username, password, role = "user" } = req.body;
  console.log(`📥 Trying to register username: ${username} with role: ${role}`);

  const users = loadUsers();

  if (users.find((u) => u.username === username)) {
    console.warn("⚠️ Username already exists!");
    return res.status(400).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔐 Password hashed successfully");

  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
    role,
    cart: [],
  };

  users.push(newUser);
  saveUsers(users);
  console.log(`✅ User registered successfully: ${username}`);

  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ user: userWithoutPassword });
});

module.exports = router;
