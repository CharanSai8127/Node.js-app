// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based MySQL
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection with retry logic
const dbConfig = {
  host: process.env.DB_HOST || 'mysql.webapps.svc.cluster.local', // Kubernetes service DNS
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test_db',
};

let db;
const maxRetries = 5; // Limit retries to prevent infinite loops
let attempt = 0;

const connectToDB = async () => {
  while (!db && attempt < maxRetries) {
    try {
      console.log(`Attempting to connect to database... (${attempt + 1}/${maxRetries})`);
      db = await mysql.createConnection(dbConfig);
      console.log('✅ Database connected.');

      // Initialize database with `users` table if it doesn't exist
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          role ENUM('Admin', 'User') NOT NULL
        )
      `;
      await db.query(createUsersTable);
      console.log('✅ Users table initialized or already exists.');
      break; // Exit loop if connection succeeds
    } catch (err) {
      attempt++;
      console.error(`❌ Database connection failed: ${err.message}`);
      if (attempt >= maxRetries) {
        console.error('❌ Max retries reached. Exiting...');
        process.exit(1); // Exit if max retries are exceeded
      }
      console.log('🔄 Retrying in 5 seconds...');
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

connectToDB();

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const [results] = await db.query('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', [name, email, role]);
    res.status(201).json({ id: results.insertId, name, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    await db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
    res.status(200).json({ id, name, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

// Start server on 0.0.0.0 for Kubernetes compatibility
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${port}`);
});
