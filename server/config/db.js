const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,              // mysql-cluster.mysql.svc.cluster.local
  port: Number(process.env.DB_PORT),       // 6446
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify DB connectivity at startup
async function init() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL via Router");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Let Kubernetes restart
  }
}

init();

module.exports = pool;

