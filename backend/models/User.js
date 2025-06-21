const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },

    profilePhoto: {
      type: String,
      default: "https://avatar.iran.liara.run/public/boy?username=Ash", // generic avatar
    },

    phone: {
      type: String,
      default: "",
    },

    shippingInfo: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
    },

    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
