// 🔧 Basic Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db");

// 🚀 Initialize App
const app = express();
const port = 3000;

// 🔌 Connect to MongoDB
connectDB();

// 🧩 Middleware
app.use(cors()); // 🌐 Enable Cross-Origin Requests
app.use(express.json()); // 📦 Parse JSON bodies
app.use(morgan("dev")); // 📋 Log HTTP requests

// 🛣️ Routes
app.use("/api/user", require("./routes/userRoutes")); // 👤 User routes
app.use("/api/category", require("./routes/categoryRoutes")); // 🗂️ Category routes
app.use("/api/product", require("./routes/productRoutes")); // 🛍️ Product routes
app.use("/api/cart", require("./routes/cartRoutes")); // 🛒 Cart routes
app.use("/api/auth", require("./routes/authRoutes")); // 🔐 Auth routes
app.use("/api/order", require("./routes/orderRoutes")); // 📦 Order routes
app.use("/api/seller", require("./routes/sellerRoutes")); // 🛍️ Seller routes

// 🏠 Root Endpoint
app.get("/", (req, res) => {
  res.send("📦 E-commerce API is running...");
});

// 🟢 Start Server
app.listen(port, () => {
  console.log(`✅ Server running at: http://localhost:${port}`);
});
