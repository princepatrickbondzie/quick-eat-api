const router = require("express").Router();
const {
  getOrder,
  getOrders,
  craeteOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { verifyToken, isAdmin, isMerchant } = require("../middleware/checkAuth");

router.get("/orders", verifyToken, getOrders);
router.get("/order", verifyToken, craeteOrder);
router.get("/order/:id", verifyToken, getOrder);
router.put("/order/:id", verifyToken, updateOrder);
router.delete("/order/:id", verifyToken, deleteOrder);

module.exports = router;
