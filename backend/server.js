// Import necessary libraries
require('dotenv').config(); // This line loads the environment variables from the .env file
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


// import functions from db.js
const { getFromDb, insertIntoDb, createTable, getTags } = require('./db');
const { get } = require('http');



// Initialize express app
const app = express();

// Use cors middleware
app.use(cors()); // This applies CORS to all incoming requests, allowing access from any domain.

// JSON parser middleware
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false // Set to true in production for security
  }
});

// Define routes
// Route to get data
app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM myTable'); // Replace 'myTable' with your actual table name
    res.json(result.rows);
    client.release();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Another example route, e.g., posting data
app.post('/data', async (req, res) => {
  const { newData } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO myTable (data) VALUES ($1) RETURNING *', [newData]); // Example query
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 11524;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Call getFromDb when the server starts
    getTags().then((data) => {
        console.log('Data from database:', data);
    }).catch((err) => {
        console.error('Error getting data from database:', err);
    });
  });
