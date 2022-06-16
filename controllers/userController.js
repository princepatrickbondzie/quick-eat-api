const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(200).json({ msg: "User deleted successfully" });
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
