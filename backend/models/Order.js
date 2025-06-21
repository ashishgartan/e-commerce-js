const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  shippingInfo: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
  },
  billingInfo: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
  },

  paymentMethod: {
    type: String,
    enum: ["card", "upi", "cod", "netbanking"],
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
      priceAtPurchase: Number,
    },
  ],

  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Paid", // assume paid since mock payment
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
