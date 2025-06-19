const express = require("express");
const router = express.Router();
const productController = require("../controllers/productContoller");

// POST /products — Add a new product
router.post("/", productController.createProduct);

// GET /products?page=1&limit=10
// GET /products — Get all products
router.get("/", productController.getAllProducts);

// GET /products/:id — Get a single product by ID
router.get("/:id", productController.getProductById);

// PUT /products/:id — Update a product by ID
router.put("/:id", productController.updateProductById);

// DELETE /products/:id — Delete a product by ID
router.delete("/:id", productController.deleteProductById);

module.exports = router;
