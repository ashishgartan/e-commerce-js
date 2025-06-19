const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../database/products.json");

/**
 * 🧠 Utility to safely read and parse the product JSON file
 */
function readProducts(res, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Failed to read products file:", err.message);
      return res.status(500).json({ error: "Failed to load products" });
    }

    try {
      const products = JSON.parse(data);
      callback(products);
    } catch (e) {
      console.error("🚫 Invalid JSON in products file:", e.message);
      res.status(500).json({ error: "Corrupted products file" });
    }
  });
}

// 🎯 GET /products/sort?sort=price_asc
router.get("/sort", (req, res) => {
  const sortParam = req.query.sort;
  console.log("📥 Sort request with query:", sortParam);

  readProducts(res, (products) => {
    if (sortParam) {
      const [key, order] = sortParam.split("_");
      products.sort((a, b) => {
        if (typeof a[key] !== "number" || typeof b[key] !== "number") return 0;
        return order === "asc" ? a[key] - b[key] : b[key] - a[key];
      });
      console.log(`🔃 Sorted products by ${key} in ${order} order`);
    }
    res.json(products);
  });
});

// 📄 GET /products/pagination?page=2&limit=5
router.get("/pagination", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  console.log(`📥 Pagination request - Page: ${page}, Limit: ${limit}`);

  readProducts(res, (products) => {
    const total = products.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);
    console.log(`✅ Returned ${paginatedProducts.length} products`);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products: paginatedProducts,
    });
  });
});

// 🔍 GET /products/id/:id
router.get("/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`🔎 Fetching product with ID ${id}`);

  readProducts(res, (products) => {
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.warn(`⚠️ Product ID ${id} not found`);
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });
});

// 💸 GET /products/price/:from/:to
router.get("/price/:from/:to", (req, res) => {
  const from = parseFloat(req.params.from);
  const to = parseFloat(req.params.to);
  console.log(`🔎 Fetching products in price range ₹${from} to ₹${to}`);

  readProducts(res, (products) => {
    const filtered = products.filter((p) => p.price >= from && p.price <= to);
    if (filtered.length === 0) {
      console.warn("⚠️ No products in this price range");
      return res.status(404).json({ error: "No products in this price range" });
    }
    res.json(filtered);
  });
});

// 🔍 GET /products/id/:from/:to (ID range)
router.get("/id/:from/:to", (req, res) => {
  const from = parseInt(req.params.from);
  const to = parseInt(req.params.to);
  console.log(`🔎 Fetching products with ID in range ${from}-${to}`);

  readProducts(res, (products) => {
    const filtered = products.filter((p) => p.id >= from && p.id <= to);
    if (filtered.length === 0) {
      console.warn("⚠️ No products in this ID range");
      return res.status(404).json({ error: "No products in this ID range" });
    }
    res.json(filtered);
  });
});

// 📦 GET /products/pagination/category/:category?page=2&&limit=10
router.get("/pagination/category/:category", (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  console.log(
    `📦 Category filter: ${category} | Page: ${page}, Limit: ${limit}`
  );

  readProducts(res, (products) => {
    const filtered = products.filter((p) => p.category === category);

    if (filtered.length === 0) {
      console.warn(`⚠️ No products found in category: ${category}`);
      return res.status(404).json({ error: "No products in this category" });
    }

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    console.log(`✅ Returning ${paginated.length} products from ${category}`);
    res.json({
      products: paginated,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      currentPage: page,
    });
  });
});

// 🔍 GET /products/search?q=shoe
router.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Search query missing" });
  }

  console.log(`🔎 Search query: '${query}'`);

  readProducts(res, (products) => {
    const filtered = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      console.warn("⚠️ No matching products found");
      return res.status(404).json({ error: "No matching products found" });
    }

    console.log(`✅ Found ${filtered.length} products matching query`);
    res.json(filtered);
  });
});

module.exports = router;
