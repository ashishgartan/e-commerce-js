const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../database/products.json");

// GET /products?sort=price_asc or sort=popularity_desc   QUERYPARAMS
router.get("/sort", (req, res) => {
  const sortParam = req.query.sort; // e.g., price_asc, price_desc
  console.log(filePath);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });

    let products = JSON.parse(data);

    if (sortParam) {
      const [key, order] = sortParam.split("_");
      products.sort((a, b) => {
        if (typeof a[key] !== "number" || typeof b[key] !== "number") return 0;
        return order === "asc" ? a[key] - b[key] : b[key] - a[key];
      });
    }
    res.json(products);
  });
});
// GET /products?page=pageNo && limit=limit      QUERYPARAMS
router.get("/pagination", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default page 1
  const limit = parseInt(req.query.limit) || 10; // Default 10 items per page

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });

    let products = JSON.parse(data);
    const total = products.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products: paginatedProducts,
    });
  });
});

router.get("/id/:id", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });
    const products = JSON.parse(data);
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
      return res.status(404).json({ error: "Product not find" });
    }
    res.json(product);
  });
});
router.get("/price/:from/:to", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });
    const products = JSON.parse(data);
    const from = parseFloat(req.params.from);
    const to = parseFloat(req.params.to);
    const filtered = products.filter(
      (item) => item.price >= from && item.price <= to
    );
    if (!filtered) {
      return res.status(404).json({ error: "Product not find" });
    }
    res.json(filtered);
  });
});
router.get("/id/:from/:to", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });
    const products = JSON.parse(data);
    const from = parseFloat(req.params.from);
    const to = parseFloat(req.params.to);
    const filtered = products.filter(
      (item) => item.id >= from && item.id <= to
    );
    if (!filtered) {
      return res.status(404).json({ error: "Product not find" });
    }
    res.json(filtered);
  });
});
// GET products/category/${category}?page=${pageNumber}&limit=${pageSize}`);

router.get("/pagination/category/:category", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });

    const products = JSON.parse(data);
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filtered = products.filter(
      (product) => product.category === category
    );

    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found in this category" });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      total: filtered.length,
    });
  });
});

//GET /products/search?q=keyword
router.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Search query missing" });
  }
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load products" });
    const products = JSON.parse(data);
    const filtered = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );
    if (!filtered) {
      return res.status(404).json({ error: "Product not find" });
    }
    res.json(filtered);
  });
});

module.exports = router;
