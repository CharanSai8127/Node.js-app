const mysql = require("mysql2/promise");

let connection = null;

async function connectWithRetry() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,        // mysql-cluster
      port: process.env.DB_PORT || 6446,
      user: process.env.DB_USER,        // app user
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Connected to MySQL via Router");
  } catch (err) {
    console.error("❌ DB connection failed, retrying in 5s:", err.message);
    setTimeout(connectWithRetry, 5000);
  }
}

// start retry loop
connectWithRetry();

// export getter (NOT a static connection)
module.exports = () => connection;

