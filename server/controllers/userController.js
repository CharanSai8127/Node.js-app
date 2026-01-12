const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const result = await userModel.addUser(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
};

module.exports = { getUsers, addUser, deleteUser };

