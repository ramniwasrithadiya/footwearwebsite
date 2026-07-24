const fs = require('fs');
let code = fs.readFileSync('server/routes/adminRoutes.ts', 'utf8');

const oldCheck = `// Check if user is admin
router.get('/check', async (req, res) => {
  const firebase_uid = req.headers['authorization']?.split('Bearer ')[1];
  if (!firebase_uid) return res.json({ isAdmin: false });
  
  try {
    const [users]: any = await pool.query('SELECT is_admin FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    res.json({ isAdmin: users.length > 0 && users[0].is_admin });
  } catch (error) {
    res.json({ isAdmin: false });
  }
});`;

const newCheck = `// Check if user is admin
router.get('/check', verifyAuth, async (req: AuthRequest, res) => {
  try {
    res.json({ isAdmin: req.mysqlUser?.is_admin === 1 });
  } catch (error) {
    res.json({ isAdmin: false });
  }
});`;

code = code.replace(oldCheck, newCheck);
fs.writeFileSync('server/routes/adminRoutes.ts', code);
