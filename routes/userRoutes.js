const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");

router.get("/users", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUser);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, deleteUser);

module.exports = router;