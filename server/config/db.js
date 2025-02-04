// Import mysql module
const mysql = require('mysql2');

// Use environment variables to configure the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql', // Default to 'mysql' if DB_HOST is not set
  user: process.env.DB_USER || 'root',  // Default to 'root' if DB_USER is not set
  password: process.env.DB_PASSWORD || 'password',  // Default to 'password' if DB_PASSWORD is not set
  database: process.env.DB_NAME || 'test_db',  // Default to 'test_db' if DB_NAME is not set
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
