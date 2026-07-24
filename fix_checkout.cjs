const fs = require('fs');
let code = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');

code = code.replace(
  "        email: profile.email || '',\n        mobile: profile.mobile || ''\n      }));",
  "        email: profile.email || '',\n        mobile: profile.mobile || '',\n        address: profile.address || ''\n      }));"
);

fs.writeFileSync('src/pages/Checkout.tsx', code);
