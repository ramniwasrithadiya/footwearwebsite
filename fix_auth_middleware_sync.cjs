const fs = require('fs');
let code = fs.readFileSync('server/middleware/authMiddleware.ts', 'utf8');

const target1 = `    // Look up user in MySQL
    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) {
      // Auto-create user if they don't exist
      const [result]: any = await pool.query(
        'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
        [firebase_uid, first_name, last_name, name, email, mobile]
      );
      
      const insertId = result.insertId;
      const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [insertId]);
      req.mysqlUser = newUsers[0];
    } else {
      req.mysqlUser = users[0];
    }`;

const replacement1 = `    // Look up user in MySQL
    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) {
      // Try linking by email for guest checkouts
      let [existingEmail]: any = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
      if (email && existingEmail.length > 0) {
        await pool.query('UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ?, mobile = IFNULL(mobile, ?) WHERE id = ?', 
          [firebase_uid, first_name || existingEmail[0].first_name, last_name || existingEmail[0].last_name, name || existingEmail[0].full_name, mobile, existingEmail[0].id]);
        const [updatedUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [existingEmail[0].id]);
        req.mysqlUser = updatedUsers[0];
      } else {
        // Auto-create user if they don't exist
        const [result]: any = await pool.query(
          'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
          [firebase_uid, first_name, last_name, name, email, mobile]
        );
        
        const insertId = result.insertId;
        const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [insertId]);
        req.mysqlUser = newUsers[0];
      }
    } else {
      req.mysqlUser = users[0];
    }`;

code = code.replace(target1, replacement1);


const target2 = `    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) {
      const [result]: any = await pool.query(
        'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
        [firebase_uid, first_name, last_name, name, email, mobile]
      );
      const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      req.mysqlUser = newUsers[0];
    } else {
      req.mysqlUser = users[0];
    }`;

const replacement2 = `    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) {
      // Try linking by email for guest checkouts
      let [existingEmail]: any = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
      if (email && existingEmail.length > 0) {
        await pool.query('UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ?, mobile = IFNULL(mobile, ?) WHERE id = ?', 
          [firebase_uid, first_name || existingEmail[0].first_name, last_name || existingEmail[0].last_name, name || existingEmail[0].full_name, mobile, existingEmail[0].id]);
        const [updatedUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [existingEmail[0].id]);
        req.mysqlUser = updatedUsers[0];
      } else {
        const [result]: any = await pool.query(
          'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
          [firebase_uid, first_name, last_name, name, email, mobile]
        );
        const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        req.mysqlUser = newUsers[0];
      }
    } else {
      req.mysqlUser = users[0];
    }`;

code = code.replace(target2, replacement2);

fs.writeFileSync('server/middleware/authMiddleware.ts', code);
