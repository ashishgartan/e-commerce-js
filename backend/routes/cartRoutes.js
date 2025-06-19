// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartContoller");

// POST /cart/:userId — Add to cart
router.post("/:userId", cartController.addToCart);

// GET /cart/:userId — Get cart
router.get("/:userId", cartController.getCart);

// PUT /cart/:userId — Update quantity
router.put("/:userId", cartController.updateQuantity);

// DELETE /cart/:userId/:productId — Remove from cart
router.delete("/:userId/:productId", cartController.removeFromCart);

// DELETE /cart/clear/:userId — Clear entire cart
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
