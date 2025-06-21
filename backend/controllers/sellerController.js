// controllers/cartController.js
const User = require("../models/User");

const Product = require("../models/Product");
const { default: mongoose } = require("mongoose");

exports.getSellerProducts = (req, res) => {
  res.json({ message: "All products for seller " + req.params.sellerId });
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, categoryId, price, stock, mainImage, images } =
      req.body;

    const sellerId = new mongoose.Types.ObjectId(req.params.sellerId);

    const product = new Product({
      title,
      description,
      categoryId: new mongoose.Types.ObjectId(categoryId),
      price,
      stock,
      sellerId,
      mainImage,
      images,
    });

    console.log("🛠️ Creating product for seller:", sellerId);
    const savedProduct = await product.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({
      message: "❌ Failed to create product",
      error: err.message,
    });
  }
};

exports.updateProduct = (req, res) => {
  res.json({ message: "Product updated", productId: req.params.productId });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: "Product deleted", productId: req.params.productId });
};

exports.getSellerOrders = (req, res) => {
  res.json({ message: "Orders for seller " + req.params.sellerId });
};

exports.updateOrderStatus = (req, res) => {
  res.json({ message: "Order status updated", orderId: req.params.orderId });
};

exports.getSellerProfile = (req, res) => {
  res.json({ message: "Profile for seller " + req.params.sellerId });
};

exports.updateSellerProfile = (req, res) => {
  res.json({ message: "Profile updated", sellerId: req.params.sellerId });
};
