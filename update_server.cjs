const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

if (!code.includes("import cartRoutes from './server/routes/cartRoutes';")) {
  code = code.replace(
    "import dealerRoutes from './server/routes/dealerRoutes';",
    "import dealerRoutes from './server/routes/dealerRoutes';\nimport cartRoutes from './server/routes/cartRoutes';"
  );
}

if (!code.includes("app.use('/api/cart', cartRoutes);")) {
  code = code.replace(
    "app.use('/api/dealer', dealerRoutes);",
    "app.use('/api/dealer', dealerRoutes);\n  app.use('/api/cart', cartRoutes);"
  );
}

fs.writeFileSync('server.ts', code);
