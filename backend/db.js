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
    const result = await client.query('SELECT * FROM Tags');
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

async function getDocumentsWithSharedTags(caseid) {
  try {
    await client.connect();

    const query = `
    SELECT ct1.case_id AS similar_case_id, c.id, c.content, COUNT(*) AS shared_tags,
           array_agg(t.name) AS shared_tag_names
    FROM case_tags ct1
    JOIN case_tags ct2 ON ct1.tag_id = ct2.tag_id
    JOIN cases c ON ct1.case_id = c.id
    JOIN tags t ON ct1.tag_id = t.id
    WHERE ct2.case_id = $1
      AND ct1.case_id != $1
    GROUP BY ct1.case_id, c.content
    ORDER BY shared_tags DESC;
  `;
    const values = [caseid];
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
  }
}

module.exports = { getFromDb, insertIntoDb };
