const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/:id", orderController.placeOrder);
// router.get("/:userId", orderController.getUserOrders); // Uncomment if you implement this function
// router.get("/:orderId", orderController.getOrderDetails); // Uncomment if you implement this function
// router.put("/:orderId", orderController.updateOrderStatus); // Uncomment if you implement this function
// router.delete("/:orderId", orderController.cancelOrder); // Uncomment if you implement this function
// router.get("/", orderController.getAllOrders); // Uncomment if you implement this function
// Uncomment the above routes as you implement them in orderController

module.exports = router;
