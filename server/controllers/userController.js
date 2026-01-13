const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    console.error("getUsers failed:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const addUser = async (req, res) => {
  try {
    const result = await userModel.addUser(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("addUser failed:", err.message);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser failed:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = { getUsers, addUser, deleteUser };

