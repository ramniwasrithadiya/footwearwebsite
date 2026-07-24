const fs = require('fs');
let code = fs.readFileSync('server/routes/adminRoutes.ts', 'utf8');

const oldIsAdmin = `const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
  } catch (error) {
    res.status(500).json({ message: 'Server error', success: false });
  }
};`;

const newIsAdmin = `const isAdmin = [verifyAuth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.mysqlUser && req.mysqlUser.is_admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admin access required', success: false });
    }
  } catch (error) {
    console.error('Admin Auth Error:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
}];`;

code = code.replace(oldIsAdmin, newIsAdmin);
fs.writeFileSync('server/routes/adminRoutes.ts', code);
