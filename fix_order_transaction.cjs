const fs = require('fs');
let code = fs.readFileSync('server/routes/orderRoutes.ts', 'utf8');

const target = `    const [orderRes]: any = await pool.query(
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
    }

    const orderId = orderRes.insertId;

    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product.id, item.size, item.quantity, item.product.price]
      );
      
      await pool.query(
        'UPDATE product_stock SET quantity = GREATEST(quantity - ?, 0) WHERE product_id = ? AND size = ?',
        [item.quantity, item.product.id, item.size]
      );
    }`;

const replacement = `    const connection = await pool.getConnection();
    await connection.beginTransaction();

    let orderId;
    try {
      const [orderRes]: any = await connection.query(
        'INSERT INTO orders (user_id, total_amount, payment_status, order_status) VALUES (?, ?, ?, ?)',
        [user_id, totalAmount, paymentStatus || 'pending', 'processing']
      );

      orderId = orderRes.insertId;

      if (guestInfo && guestInfo.address) {
        await connection.query(
          \`INSERT INTO addresses 
          (user_id, first_name, last_name, email, mobile, address_line_1, is_default) 
          VALUES (?, ?, ?, ?, ?, ?, ?)\`,
          [user_id, guestInfo.firstName, guestInfo.lastName, guestInfo.email, guestInfo.mobile, guestInfo.address, 1]
        );
      }

      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
          [orderId, item.product.id, item.size, item.quantity, item.product.price]
        );
        
        await connection.query(
          'UPDATE product_stock SET quantity = GREATEST(quantity - ?, 0) WHERE product_id = ? AND size = ?',
          [item.quantity, item.product.id, item.size]
        );
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }`;

code = code.replace(target, replacement);
fs.writeFileSync('server/routes/orderRoutes.ts', code);
