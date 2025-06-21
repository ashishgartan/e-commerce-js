const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/signup - Register a new user
router.post("/signup", authController.register);

// POST /api/auth/login - Login user and return token
router.post("/login", authController.login);

module.exports = router;
