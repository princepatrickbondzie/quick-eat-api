const Food = require("../models/Food");

const getFoods = async (req, res) => {
  const foods = await Food.find();
  res.status(200).json({ foods });
};

const getFood = async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);
  res.status(200).json({ food });
};

const craeteFood = async (req, res) => {
  const {
    name,
    description,
    duration,
    price,
    quantity,
    image,
    category,
  } = req.body;
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateFood = async (req, res) => {
  const id = req.params.id;
  const food = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ food });
};

const deleteFood = async (req, res) => {
  const id = req.params.id;
  await Food.findByIdAndDelete(id);
  res.status(200).json({ msg: "Food deleted successfully" });
};

module.exports = {
  getFoods,
  getFood,
  craeteFood,
  updateFood,
  deleteFood,
};
