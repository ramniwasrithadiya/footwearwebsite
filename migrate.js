import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log(`Connecting to MySQL database at ${process.env.DB_HOST}...`);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    try {
      const schemaPath = path.join(__dirname, 'backend', 'database.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      console.log('Running database schema migration...');
      await connection.query(schema);
      console.log('Database schema migrated successfully! All tables have been created.');
    } catch (err) {
      console.error('Migration failed:', err);
    } finally {
      await connection.end();
    }
  } catch (connectionErr) {
    console.error('Failed to connect to the database. Check your .env credentials or if your database server allows external connections.', connectionErr);
  }
}

migrate();
