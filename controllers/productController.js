const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({ product });
};

const craeteProduct = async (req, res) => {
  const { name, description, price, quantity, image, category } = req.body;
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ msg: "Product deleted successfully" });
};

module.exports = {
  getProducts,
  getProduct,
  craeteProduct,
  updateProduct,
  deleteProduct,
};
