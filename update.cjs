const fs = require('fs');
let code = fs.readFileSync('server/routes/authRoutes.ts', 'utf8');
code = code.replace(
  "const { firebase_uid, first_name, last_name, email, mobile } = req.body;",
  "const { firebase_uid, tempUid, first_name, last_name, email, mobile } = req.body;"
);
code = code.replace(
  "const [result] = await pool.query(\n      'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',\n      [firebase_uid, first_name, last_name, full_name, email, mobile]\n    );",
  `if (tempUid) {
      const [updateResult]: any = await pool.query(
        'UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ? WHERE firebase_uid = ?',
        [firebase_uid, first_name, last_name, full_name, tempUid]
      );
      if (updateResult.affectedRows > 0) {
        return res.status(200).json({ message: 'User updated successfully', success: true });
      }
    }

    const [existingUsers]: any = await pool.query(
      'SELECT id, firebase_uid FROM users WHERE email = ? OR mobile = ? LIMIT 1',
      [email, mobile]
    );

    if (existingUsers.length > 0) {
      const userId = existingUsers[0].id;
      await pool.query(
        'UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ? WHERE id = ?',
        [firebase_uid, first_name, last_name, full_name, userId]
      );
      return res.status(200).json({ message: 'User updated successfully', success: true });
    }

    const [result] = await pool.query(
      'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
      [firebase_uid, first_name, last_name, full_name, email, mobile]
    );`
);
fs.writeFileSync('server/routes/authRoutes.ts', code);
