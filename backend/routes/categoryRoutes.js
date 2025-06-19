// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// POST /categories — Create new category
router.post("/", categoryController.createCategory);

// GET /categories — Get all categories
router.get("/", categoryController.getAllCategories);

// GET /categories/:id — Get one category by ID
router.get("/:id", categoryController.getCategoryById);

// PUT /categories/:id — Update a category
router.put("/:id", categoryController.updateCategory);

// DELETE /categories/:id — Delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
