const fs = require('fs');
let code = fs.readFileSync('server/routes/orderRoutes.ts', 'utf8');

code = code.replace(
  "    const [orderRes]: any = await pool.query(\n      'INSERT INTO orders (user_id, total_amount, payment_status, order_status) VALUES (?, ?, ?, ?)',\n      [user_id, totalAmount, paymentStatus || 'pending', 'processing']\n    );",
  `    const [orderRes]: any = await pool.query(
      'INSERT INTO orders (user_id, total_amount, payment_status, order_status) VALUES (?, ?, ?, ?)',
      [user_id, totalAmount, paymentStatus || 'pending', 'processing']
    );

    // Save address
    if (guestInfo && guestInfo.address) {
      await pool.query(
        \`INSERT INTO addresses 
        (user_id, first_name, last_name, email, mobile, address_line_1, is_default) 
        VALUES (?, ?, ?, ?, ?, ?, ?)\`,
        [user_id, guestInfo.firstName, guestInfo.lastName, guestInfo.email, guestInfo.mobile, guestInfo.address, 1]
      );
    }`
);
fs.writeFileSync('server/routes/orderRoutes.ts', code);
