const db = require("../config/db");

const getUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const addUser = async (user) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
    [user.name, user.email, user.role]
  );
  return result;
};

const deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = { getUsers, addUser, deleteUser };

