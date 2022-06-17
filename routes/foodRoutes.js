const router = require("express").Router();
const {
  getFoods,
  getFood,
  craeteFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { verifyToken, isAdmin, isMerchant } = require("../middleware/checkAuth");

router.get("/foods", verifyToken, getFoods);
router.get("/food", verifyToken, craeteFood);
router.get("/food/:id", verifyToken, getFood);
router.put("/food/:id", verifyToken, updateFood);
router.delete("/food/:id", verifyToken, deleteFood);

module.exports = router;
