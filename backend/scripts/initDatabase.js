import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env from the root directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function initDB() {
  console.log('Connecting to database...');
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
  });

  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the MySQL database:', process.env.DB_HOST);
    
    // Path to database.sql
    const schemaPath = path.join(process.cwd(), 'backend', 'database.sql');
    if (!fs.existsSync(schemaPath)) {
       console.error('Migration file not found at:', schemaPath);
       process.exit(1);
    }
    
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Running database schema initialization from backend/database.sql...');
    await connection.query(schema);
    console.log('Database schema initialized successfully. Tables are created.');
    
    // Confirm tables creation
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Confirmed Tables in database:');
    tables.forEach((row) => {
        console.log(`- ${Object.values(row)[0]}`);
    });

    connection.release();
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to database or initialize schema:');
    console.error(err);
    process.exit(1);
  }
}

initDB();
