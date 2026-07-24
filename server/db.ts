import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

// Test connection and initialize schema
pool.getConnection()
  .then(async (connection) => {
    console.log('Successfully connected to the MySQL database.');
    
    try {
      const schemaPath = path.join(process.cwd(), 'backend', 'database.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      console.log('Running database schema initialization...');
      await connection.query(schema);
      console.log('Database schema initialized successfully.');
    } catch (err) {
      console.error('Failed to initialize database schema:', err);
    } finally {
      connection.release();
    }
  })
  .catch((err) => {
    console.error('Error connecting to the MySQL database:', err);
  });

export default pool;
