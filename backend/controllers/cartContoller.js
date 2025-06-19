// controllers/cartController.js
const User = require("../models/User");
const Product = require("../models/Product");

// 🟢 Add to Cart
exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingItem = user.cart.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add to cart", details: err.message });
  }
};

// 🟡 Get User Cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// 🟠 Update Quantity
exports.updateQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const item = user.cart.find((item) => item.product.equals(productId));
    if (!item) return res.status(404).json({ error: "Product not in cart" });

    item.quantity = quantity;
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
};

// 🔴 Remove from Cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    user.cart = user.cart.filter((item) => !item.product.equals(productId));
    await user.save();

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// 🧹 Clear Entire Cart
exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
