const { Pool } = require('pg');
require('dotenv').config();

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

async function getFromDb() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM myTable');
    return result.rows;
  } finally {
    client.release();
  }
}

async function insertIntoDb(data) {
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO myTable (data) VALUES ($1) RETURNING *', [data]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = { getFromDb, insertIntoDb };
