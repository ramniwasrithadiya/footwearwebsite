const fs = require('fs');
let code = fs.readFileSync('server/routes/authRoutes.ts', 'utf8');

code = code.replace(
  "res.status(200).json({ success: true, profile: user });",
  `const [addresses]: any = await pool.query('SELECT * FROM addresses WHERE user_id = ? AND is_default = 1 LIMIT 1', [user.id]);
      if (addresses.length > 0) {
        user.address = addresses[0].address_line_1;
      }
      res.status(200).json({ success: true, profile: user });`
);
fs.writeFileSync('server/routes/authRoutes.ts', code);
