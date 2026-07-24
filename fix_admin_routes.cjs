const fs = require('fs');
let code = fs.readFileSync('server/routes/adminRoutes.ts', 'utf8');

code = code.replace(
  "import express from 'express';\nimport pool from '../db';",
  "import express from 'express';\nimport pool from '../db';\nimport { verifyAuth, AuthRequest } from '../middleware/authMiddleware';"
);

const oldIsAdmin = `// Admin Middleware
const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const firebase_uid = req.headers['authorization']?.split('Bearer ')[1];
  if (!firebase_uid) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  
  try {
    const [users]: any = await pool.query('SELECT is_admin FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length > 0 && users[0].is_admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden', success: false });
    }
  } catch (err) {
    console.error('Admin Auth Error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};`;

const newIsAdmin = `// Admin Middleware
const isAdmin = [verifyAuth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.mysqlUser && req.mysqlUser.is_admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admin access required', success: false });
    }
  } catch (err) {
    console.error('Admin Auth Error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
}];`;

code = code.replace(oldIsAdmin, newIsAdmin);

// Also fix the upload routes which have type errors we saw earlier: Property 'files' does not exist on type 'Request'
code = code.replace(/req\.files/g, "(req as any).files");

fs.writeFileSync('server/routes/adminRoutes.ts', code);
