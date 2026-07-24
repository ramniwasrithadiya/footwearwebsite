const fs = require('fs');
let code = fs.readFileSync('server/middleware/authMiddleware.ts', 'utf8');

code = code.replace(
  "import * as admin from 'firebase-admin';",
  "import admin from 'firebase-admin';"
);

code = code.replace(
  "if (!admin.apps.length) {\n  admin.initializeApp({\n    projectId: \"emailmobileauth-8090c\",\n  });\n}",
  ""
);

code = "import { getAuth } from 'firebase-admin/auth';\nimport { initializeApp, getApps } from 'firebase-admin/app';\n" + code;
code = code.replace(
  "export interface AuthRequest extends Request {",
  "if (!getApps().length) {\n  initializeApp({ projectId: 'emailmobileauth-8090c' });\n}\n\nexport interface AuthRequest extends Request {"
);

code = code.replace(/admin\.auth\(\)/g, "getAuth()");

fs.writeFileSync('server/middleware/authMiddleware.ts', code);
