const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace("import { Profile } from './pages/Profile';", "import { Profile } from './pages/Profile';\nimport { Checkout } from './pages/Checkout';");
code = code.replace("<Route path=\"/profile\" element={<Profile />} />", "<Route path=\"/profile\" element={<Profile />} />\n          <Route path=\"/checkout\" element={<Checkout />} />");
fs.writeFileSync('src/App.tsx', code);
