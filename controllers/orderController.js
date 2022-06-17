const Order = require("../models/Order");

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ orders });
};

const getOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  res.status(200).json({ order });
};

const craeteOrder = async (req, res) => {
    const { } = req.body;
    
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ order });
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  await Order.findByIdAndDelete(id);
  res.status(200).json({ msg: "Order deleted successfully" });
};

module.exports = { getOrders, getOrder, craeteOrder, updateOrder, deleteOrder };
