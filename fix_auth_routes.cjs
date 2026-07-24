const fs = require('fs');
let code = fs.readFileSync('server/routes/authRoutes.ts', 'utf8');

if (!code.includes("import { verifyAuth, AuthRequest } from '../middleware/authMiddleware';")) {
  code = code.replace(
    "import pool from '../db';",
    "import pool from '../db';\nimport { verifyAuth, AuthRequest } from '../middleware/authMiddleware';"
  );
}

code = code.replace(
  "router.get('/profile', async (req, res) => {",
  "router.get('/profile', verifyAuth, async (req: AuthRequest, res) => {"
);

code = code.replace(
  "const { firebase_uid } = req.query;\n    if (!firebase_uid) {\n      return res.status(400).json({ message: 'firebase_uid is required.', success: false });\n    }\n    const [rows]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);",
  "const [rows]: any = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [req.mysqlUser.id]);"
);

fs.writeFileSync('server/routes/authRoutes.ts', code);
