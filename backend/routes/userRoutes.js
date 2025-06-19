const express = require("express");
const router = express.Router();
const userController = require("../controllers/userContoller");

// GET /user — Get all users
router.get("/", userController.getAllUsers);

// GET /user/:id — Get user by ID
router.get("/:id", userController.getUserById);

// PUT /user/:id — Update user by ID
router.put("/:id", userController.updateUser);

// DELETE /user/:id — Delete user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
