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
const loadUsers = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const saveUsers = (users) =>
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  // Exclude password before sending
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// POST /signup
router.post("/signup", async (req, res) => {
  const { username, password, role = "user" } = req.body;
  const users = loadUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
    role,
    cart: [],
  };

  users.push(newUser);
  saveUsers(users);

  //   const token = jwt.sign({ id: newUser.id, role }, JWT_SECRET_KEY, {
  //     expiresIn: "1h",
  //   });

  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ user: userWithoutPassword });
});

module.exports = router;
