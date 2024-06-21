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
    const result = await client.query('SELECT * FROM tags');
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

// adds a case with tags to the DB. Returns the caseid.
async function addCaseWithTags(caseContent, tags) {
  const client = await pool.connect();
  try {
    // Insert the case content into the cases table
    const insertCaseQuery = `
      INSERT INTO cases (case_content) 
      VALUES ($1) 
      RETURNING case_id;
    `;
    const caseResult = await client.query(insertCaseQuery, [caseContent]);
    const caseId = caseResult.rows[0].case_id;

    // Insert each tag into the tags table if it doesn't exist and get the tag_id
    for (const tag of tags) {
      const insertTagQuery = `
        INSERT INTO tags (tag_name) 
        VALUES ($1) 
        ON CONFLICT (tag_name) DO NOTHING 
        RETURNING tag_id;
      `;
      const tagResult = await client.query(insertTagQuery, [tag]);
      let tagId;
      if (tagResult.rows.length > 0) {
        tagId = tagResult.rows[0].tag_id;
      } else {
        // If the tag already exists, fetch its tag_id
        const selectTagQuery = `SELECT tag_id FROM tags WHERE tag_name = $1`;
        const existingTagResult = await client.query(selectTagQuery, [tag]);
        tagId = existingTagResult.rows[0].tag_id;
      }

      // Insert into the case_tags table to associate the case with the tag
      const insertCaseTagQuery = `
        INSERT INTO case_tags (case_id, tag_id) 
        VALUES ($1, $2);
      `;
      await client.query(insertCaseTagQuery, [caseId, tagId]);
    }

    console.log('Case and tags inserted successfully');
    return caseId;
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
  }
}

//given a caseid, this function returns the most similar cases (tag-wise)
async function getCasesWithSharedTags(caseid) {
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

//gets similar cases from a list of tags
async function getCasesByTags(tags) {
  const client = await pool.connect();
  try {
    const query = `
      SELECT c.id, c.content, COUNT(t.id) AS shared_tags, array_agg(t.name) AS shared_tag_names
      FROM cases c
      JOIN case_tags ct ON c.id = ct.id
      JOIN tags t ON ct.tag_id = t.id
      WHERE t.name = ANY($1::text[])
      GROUP BY c.id, c.content
      ORDER BY shared_tags DESC;
    `;
    const values = [tags];
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
  }
}

//uploads a case and searches for similar cases in the db
async function addCaseAndFindSimilar(caseContent, tags) {
  try {
    // Add the new case and tags, and get the new case ID
    const newCaseId = await addCaseWithTags(caseContent, tags);
    console.log('New case ID:', newCaseId);

    // Find similar cases based on the new case ID
    const similarCases = await getCasesWithSharedTags(newCaseId);
    console.log('Similar cases:', similarCases);

    return { newCaseId, similarCases };
  } catch (err) {
    console.error('Error:', err);
  }
}

//debug function: gets all tags from the db
async function getAllTags() {
  const client = await pool.connect();
  try {
    const query = 'SELECT id, name FROM tags';
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
  }
}

//debug function: gets all cases from the db
async function getAllCases() {
  const client = await pool.connect();
  try {
    const query = 'SELECT id, content FROM cases';
    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
  }
}

module.exports = { getFromDb, insertIntoDb, getCasesWithSharedTags, addCaseWithTags, addCaseAndFindSimilar, getAllTags, getAllCases, getCasesByTags};
