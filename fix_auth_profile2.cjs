const fs = require('fs');
let code = fs.readFileSync('server/routes/authRoutes.ts', 'utf8');

code = code.replace(
  /router\.get\('\/profile',.*}\);/s,
  `router.get('/profile', verifyAuth, async (req: AuthRequest, res) => {
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
});`
);
fs.writeFileSync('server/routes/authRoutes.ts', code);
