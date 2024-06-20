const { Client } = require('pg');

// Database connection details
const client = new Client({
  host: 'your_rds_endpoint',
  port: 5432,
  database: 'your_db_name',
  user: 'your_username',
  password: 'your_password'
});

// SQL commands to create tables
const createTablesQuery = `
CREATE TABLE IF NOT EXISTS Cases (
    id SERIAL PRIMARY KEY,
    case_notes TEXT NOT NULL,
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

// Sample data
const cases = [
  'Patient exhibits signs of anxiety',
  'Patient shows symptoms of depression',
  'Patient is recovering from severe stress'
];

const tags = ['anxiety', 'depression', 'stress'];

const caseTags = [
  [1, 1],
  [2, 2],
  [3, 3],
  [1, 3]
];

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log("Connected to the PostgreSQL database.");
    return client.query(createTablesQuery);
  })
  .then(() => {
    console.log("Tables created successfully.");

    const insertCasePromises = cases.map(caseNotes =>
      client.query('INSERT INTO Cases (case_notes) VALUES ($1) RETURNING id;', [caseNotes])
    );
    return Promise.all(insertCasePromises);
  })
  .then(() => {
    console.log("Cases inserted successfully.");

    const insertTagPromises = tags.map(tagName =>
      client.query('INSERT INTO Tags (tag_name) VALUES ($1) ON CONFLICT (tag_name) DO NOTHING RETURNING id;', [tagName])
    );
    return Promise.all(insertTagPromises);
  })
  .then(() => {
    console.log("Tags inserted successfully.");

    const insertCaseTagsPromises = caseTags.map(([caseId, tagId]) =>
      client.query('INSERT INTO CaseTags (case_id, tag_id) VALUES ($1, $2);', [caseId, tagId])
    );
    return Promise.all(insertCaseTagsPromises);
  })
  .then(() => {
    console.log("CaseTags inserted successfully.");
  })
  .catch(err => {
    console.error("Error executing query", err.stack);
  })
  .finally(() => {
    client.end();
    console.log("PostgreSQL connection closed.");
  });