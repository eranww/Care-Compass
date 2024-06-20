const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Database connection details
const pool = new Pool({
  user: 'your_username',
  host: 'your_rds_endpoint',
  database: 'your_db_name',
  password: 'your_password',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Create tables (for demonstration purposes, usually you'd have a migration system)
const createTablesQuery = `
CREATE TABLE IF NOT EXISTS Cases (
    id SERIAL PRIMARY KEY,
    case_notes TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS CaseTags (
    case_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (case_id, tag_id),
    FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE
);
`;

pool.query(createTablesQuery).then(() => console.log("Tables created successfully."));

// Routes
app.get('/cases', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cases');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/cases', async (req, res) => {
  try {
    const { case_notes } = req.body;
    const newCase = await pool.query(
      'INSERT INTO Cases (case_notes) VALUES ($1) RETURNING *',
      [case_notes]
    );
    res.json(newCase.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});