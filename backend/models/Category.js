// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  image: String, // optional category thumbnail/banner
});

module.exports = mongoose.model("Category", categorySchema);
