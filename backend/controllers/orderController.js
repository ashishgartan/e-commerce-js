const Order = require("../models/Order");
const mongoose = require("mongoose");
exports.placeOrder = async (req, res) => {
  //   console.log("Placing order with body:", req.body);
  try {
    const { shippingInfo, billingInfo, paymentMethod, totalAmount, items } =
      req.body;

    const newOrder = new Order({
      userId: req.params.id, // Assuming user ID is passed in the URL
      shippingInfo,
      billingInfo,
      paymentMethod,
      totalAmount,
      items: items.map((item) => {
        item._id = new mongoose.Types.ObjectId(item._id);
        return item;
      }),
      orderStatus: "Processing", // Default status
      paymentStatus: "Paid", // Assume paid since this is a mock payment
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "✅ Order placed successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "❌ Failed to place order", error: err.message });
  }
};
