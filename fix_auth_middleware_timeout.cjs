const fs = require('fs');
let code = fs.readFileSync('server/middleware/authMiddleware.ts', 'utf8');

const oldCatch = `  } catch (error: any) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token', error: error.message });
  }`;

const newCatch = `  } catch (error: any) {
    console.error("Auth Middleware Error:", error);
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED' || error.fatal) {
      return res.status(503).json({ success: false, message: 'Database connection failed' });
    }
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token', error: error.message });
  }`;

code = code.replace(oldCatch, newCatch);
fs.writeFileSync('server/middleware/authMiddleware.ts', code);
