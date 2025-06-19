// controllers/categoryController.js
const Category = require("../models/Category");

// 🔹 Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create category", details: err.message });
  }
};

// 🔍 Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// 🧾 Get Single Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    console.log("Category ID:", req.params.id); // Debugging line
    console.log("Category Object:", category); // Debugging line
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Invalid category ID" });
  }
};

// ✏️ Update Category
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update category", details: err.message });
  }
};

// ❌ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete category" });
  }
};
