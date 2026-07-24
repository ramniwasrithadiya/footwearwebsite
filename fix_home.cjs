const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');
code = code.replace("const bestSellers = products.filter(p => p.isBestSeller || p.featured).slice(0, 4);", "const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);");
code = code.replace("const newArrivals = products.filter(p => p.isNewArrival || p.featured).slice(0, 4);", "const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);");
fs.writeFileSync('src/pages/Home.tsx', code);
