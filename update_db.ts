import pool from './server/db.js';

async function run() {
  const connection = await pool.getConnection();
  try {
    await connection.query('ALTER TABLE orders MODIFY user_id INT;');
    await connection.query('ALTER TABLE orders ADD COLUMN guest_email VARCHAR(255);');
    await connection.query('ALTER TABLE orders ADD COLUMN guest_mobile VARCHAR(20);');
    await connection.query('ALTER TABLE orders ADD COLUMN guest_name VARCHAR(200);');
    await connection.query('ALTER TABLE orders ADD COLUMN address TEXT;');
    console.log("Database altered.");
  } catch(e) {
    console.error(e);
  } finally {
    connection.release();
    process.exit(0);
  }
}
run();
