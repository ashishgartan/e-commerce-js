const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

// 🛍️ Get all products listed by this seller
router.get("/products/:sellerId", sellerController.getSellerProducts);

// ➕ Add a new product
router.post("/products/:userId", sellerController.createProduct);

// ✏️ Update a product
router.put("/products/:productId", sellerController.updateProduct);

// 🗑️ Delete a product
router.delete("/products/:productId", sellerController.deleteProduct);

// 📦 Get all orders for this seller
router.get("/orders/:sellerId", sellerController.getSellerOrders);

// 🔄 Update order status (e.g. Shipped)
router.put("/orders/:orderId/status", sellerController.updateOrderStatus);

// 👤 Get seller profile
router.get("/profile/:sellerId", sellerController.getSellerProfile);

// ✏️ Update seller profile
router.put("/profile/:sellerId", sellerController.updateSellerProfile);

module.exports = router;
