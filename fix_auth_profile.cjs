const fs = require('fs');
let code = fs.readFileSync('server/routes/authRoutes.ts', 'utf8');

const oldProfile = `router.get('/profile', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const { firebase_uid } = req.query;
    if (!firebase_uid) {
      return res.status(400).json({ message: 'firebase_uid is required.', success: false });
    }
    const [rows]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    
    if (rows.length > 0) {
      res.status(200).json({ success: true, profile: rows[0] });
    } else {
      res.status(404).json({ message: 'Profile not found.', success: false });
    }
  } catch (error: any) {
    console.error('Profile Error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});`;

const newProfile = `router.get('/profile', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.mysqlUser;
    if (user) {
      res.status(200).json({ success: true, profile: user });
    } else {
      res.status(404).json({ message: 'Profile not found.', success: false });
    }
  } catch (error: any) {
    console.error('Profile Error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});`;

code = code.replace(oldProfile, newProfile);
fs.writeFileSync('server/routes/authRoutes.ts', code);
