const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  stock: {
    type: Number,
    default: 0,
  },

  brand: String,

  sku: String,

  weight: Number,

  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },

  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Preorder"],
    default: "In Stock",
  },

  returnPolicy: String,
  minimumOrderQuantity: {
    type: Number,
    default: 1,
  },

  mainImage: String,

  images: [String], // Array of image URLs

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
