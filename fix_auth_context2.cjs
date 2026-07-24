const fs = require('fs');
let code = fs.readFileSync('src/AuthContext.tsx', 'utf8');

code = code.replace(
  "  mobile: string;\n}",
  "  mobile: string;\n  address?: string;\n}"
);

code = code.replace(
  "              email: data.email,\n              mobile: data.mobile,",
  "              email: data.email,\n              mobile: data.mobile,\n              address: data.address,"
);
fs.writeFileSync('src/AuthContext.tsx', code);
