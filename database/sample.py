import psycopg2

# Database connection details
db_host = 'your_rds_endpoint'
db_port = '5432'
db_name = 'your_db_name'
db_user = 'your_username'
db_password = 'your_password'

# SQL commands to create tables
create_tables_query = '''
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
'''

# Sample data
cases = [
    'Patient exhibits signs of anxiety',
    'Patient shows symptoms of depression',
    'Patient is recovering from severe stress'
]

tags = ['anxiety', 'depression', 'stress']

case_tags = [
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 3)
]

# Connect to the PostgreSQL database
try:
    connection = psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password
    )
    cursor = connection.cursor()

    # Create tables
    cursor.execute(create_tables_query)
    connection.commit()
    print("Tables created successfully.")

    # Insert sample data into Cases table
    for case_notes in cases:
        cursor.execute('INSERT INTO Cases (case_notes) VALUES (%s) RETURNING id;', (case_notes,))
    connection.commit()

    # Insert sample data into Tags table
    for tag_name in tags:
        cursor.execute('INSERT INTO Tags (tag_name) VALUES (%s) ON CONFLICT (tag_name) DO NOTHING;', (tag_name,))
    connection.commit()

    # Insert sample data into CaseTags table
    for case_id, tag_id in case_tags:
        cursor.execute('INSERT INTO CaseTags (case_id, tag_id) VALUES (%s, %s);', (case_id, tag_id))
    connection.commit()

    print("Sample data inserted successfully.")

except Exception as error:
    print(f"Error: {error}")

finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection closed.")