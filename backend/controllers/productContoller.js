const Product = require("../models/Product");
const mongoose = require("mongoose");
// 🆕 Create Product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // ✅ Convert categoryId string to ObjectId
    if (!mongoose.Types.ObjectId.isValid(productData.categoryId)) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    productData.categoryId = new mongoose.Types.ObjectId(
      productData.categoryId
    );

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ error: "❌ Failed to add product", details: err.message });
  }
};
// 📦 Get All Products with Advanced Query Options
/**GET /products?page=2&limit=5
GET /products?category=electronics
GET /products?minPrice=100&maxPrice=500
GET /products?search=headphones
GET /products?sortBy=price&sortOrder=asc
 */
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      categoryId,
      minPrice,
      maxPrice,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      brand,
      minRating,
      condition,
      seller,
      minDiscount,
      createdWithin,
      includeOutOfStock,
      payOnDelivery,
      delivery, // "today" | "tomorrow"
    } = req.query;

    const query = {};

    // 🗂️ Category (support multiple)
    if (categoryId) {
      const categoryArray = Array.isArray(categoryId)
        ? categoryId
        : [categoryId];
      query.categoryId = {
        $in: categoryArray.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    // 💰 Price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // 🔍 Search in title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🏷️ Brand filter
    if (brand) {
      query.brand = { $in: Array.isArray(brand) ? brand : [brand] };
    }

    // ⭐ Rating
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // ⚙️ Condition
    if (condition) {
      query.condition = {
        $in: Array.isArray(condition) ? condition : [condition],
      };
    }

    // 🛍️ Seller
    if (seller) {
      query.seller = { $in: Array.isArray(seller) ? seller : [seller] };
    }

    // 🎯 Discount
    if (minDiscount) {
      query.discountPercentage = { $gte: parseFloat(minDiscount) };
    }

    // 📦 Availability
    if (includeOutOfStock !== "true") {
      query.stock = { $gt: 0 };
    }

    // 📆 New Arrivals
    if (createdWithin) {
      const days = parseInt(createdWithin);
      const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      query.createdAt = { $gte: thresholdDate };
    }

    // 🚚 Delivery Date
    if (delivery === "today") {
      query.createdAt = {
        $gte: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      };
    } else if (delivery === "tomorrow") {
      query.createdAt = {
        $gte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      };
    }

    // 💵 Pay on Delivery
    if (payOnDelivery === "true") {
      query.payOnDelivery = true;
    }

    // 🔃 Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // 📤 Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // ✅ Fetch products
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOptions)
      .populate("categoryId", "_id name");

    const total = await Product.countDocuments(query);

    // 📦 Response
    res.json({
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (err) {
    res.status(500).json({
      error: "❌ Failed to get products",
      details: err.message,
    });
  }
};

// 🔍 Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid product ID" });
  }
};

// ✏️ Update Product by ID
exports.updateProductById = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Product not found to update" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update product", details: err.message });
  }
};

// ❌ Delete Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Product not found to delete" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete product" });
  }
};

// // ❌ Delete Product by ID
// exports.deleteProductById = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.status(404).json({ error: "Product not found to delete" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: "Failed to delete product" });
//   }
// };
