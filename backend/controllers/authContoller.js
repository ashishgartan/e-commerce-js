const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "your_jwt_secret_key"; // 🔐 Replace with env var in production

// 📝 Register Controller
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // 🔍 Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📦 Create user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
};

// 🔐 Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // 🪙 Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user: user, token: token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};
