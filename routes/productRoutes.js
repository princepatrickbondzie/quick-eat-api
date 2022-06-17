const router = require("express").Router();
const {
  getProducts,
  getProduct,
  craeteProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { verifyToken,isAdmin,isMerchant } = require("../middleware/checkAuth");

router.get("/products", verifyToken, getProducts);
router.get("/product", verifyToken, craeteProduct);
router.get("/product/:id", verifyToken, getProduct);
router.put("/product/:id", verifyToken, updateProduct);
router.delete("/product/:id", verifyToken, deleteProduct);

module.exports = router;