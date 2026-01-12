const getDb = require("../config/db");

const getUsers = async () => {
  const db = getDb();
  if (!db) throw new Error("DB not ready");
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const addUser = async (user) => {
  const db = getDb();
  if (!db) throw new Error("DB not ready");
  const [result] = await db.query(
    "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
    [user.name, user.email, user.role]
  );
  return result;
};

const deleteUser = async (id) => {
  const db = getDb();
  if (!db) throw new Error("DB not ready");
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = { getUsers, addUser, deleteUser };

