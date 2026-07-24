const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

if (!code.includes('stock?:')) {
  code = code.replace(
    "  sizes: number[];\n  colors: string[];",
    "  sizes: number[];\n  colors: string[];\n  stock?: {size: number, quantity: number}[];"
  );
  fs.writeFileSync('src/types.ts', code);
}
