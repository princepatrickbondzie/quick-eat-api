const router = require("express").Router();
const {
  getOrder,
  getOrders,
  craeteOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { verifyToken } = require("../controllers/authController");

router.get("/products", verifyToken, getOrders);
router.get("/product", verifyToken, craeteOrder);
router.get("/product/:id", verifyToken, getOrder);
router.put("/product/:id", verifyToken, updateOrder);
router.delete("/product/:id", verifyToken, deleteOrder);

module.exports = router;
