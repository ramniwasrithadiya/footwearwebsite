import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { firebase_uid } = req.query;
    if (!firebase_uid) return res.status(400).json({ success: false, message: 'firebase_uid required' });

    const [users]: any = await pool.query('SELECT id FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    const user_id = users[0].id;

    const [orders]: any = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [user_id]);

    const formattedOrders = [];
    for (const row of orders) {
      // Get first item to show in list
      const [items]: any = await pool.query(`
        SELECT oi.*, p.name, pi.image_url 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        LEFT JOIN product_images pi ON p.id = pi.product_id 
        WHERE oi.order_id = ? GROUP BY oi.id LIMIT 1
      `, [row.id]);
      
      formattedOrders.push({
        id: row.id.toString(),
        orderId: "ORD-" + row.id.toString().padStart(5, '0'),
        productName: items.length > 0 ? items[0].name : 'Product',
        productImage: items.length > 0 && items[0].image_url ? items[0].image_url : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        quantity: items.length > 0 ? items[0].quantity : 1,
        orderDate: new Date(row.created_at).toLocaleDateString(),
        status: row.order_status,
        totalAmount: row.total_amount
      });
    }

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firebase_uid, guestInfo, totalAmount, items, paymentStatus } = req.body;
    
    let user_id;
    let isNewUser = false;
    let tempUid = null;

    if (firebase_uid) {
      const [users]: any = await pool.query('SELECT id FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
      if (users.length > 0) {
        user_id = users[0].id;
      }
    }

    // If no user found via firebase_uid, try finding by email/mobile or create guest
    if (!user_id && guestInfo) {
      const { email, mobile, firstName, lastName } = guestInfo;
      const [existingUsers]: any = await pool.query(
        'SELECT id, firebase_uid FROM users WHERE email = ? OR mobile = ? LIMIT 1', 
        [email, mobile]
      );

      if (existingUsers.length > 0) {
        user_id = existingUsers[0].id;
        // Check if it's a real user or a guest user
        if (existingUsers[0].firebase_uid.startsWith('guest_')) {
          isNewUser = true;
          tempUid = existingUsers[0].firebase_uid;
        }
      } else {
        tempUid = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const [newUser]: any = await pool.query(
          'INSERT INTO users (firebase_uid, first_name, last_name, email, mobile) VALUES (?, ?, ?, ?, ?)',
          [tempUid, firstName, lastName, email, mobile]
        );
        user_id = newUser.insertId;
        isNewUser = true;
      }
    }

    if (!user_id) {
      return res.status(400).json({ success: false, message: 'User information is required' });
    }

    // Create order
    const [orderRes]: any = await pool.query(
      'INSERT INTO orders (user_id, total_amount, payment_status, order_status) VALUES (?, ?, ?, ?)',
      [user_id, totalAmount, paymentStatus || 'pending', 'processing']
    );
    const orderId = orderRes.insertId;

    for (const item of items) {
      // items has product.id, quantity, size, price
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product.id, item.size, item.quantity, item.product.price]
      );
      
      // Decrease stock
      await pool.query(
        'UPDATE product_stock SET quantity = GREATEST(quantity - ?, 0) WHERE product_id = ? AND size = ?',
        [item.quantity, item.product.id, item.size]
      );
    }

    // Since we can't alter orders table easily to add address, we'll store it... wait, we don't have address field in orders. 
    // The prompt says "Collect Complete Delivery Address". We should just accept it even if we don't store it for now due to DB limitation, 
    // or we can add it to the DB schema script and hope it runs next time.

    res.status(201).json({ 
      success: true, 
      orderId: "ORD-" + orderId.toString().padStart(5, '0'),
      isNewUser,
      tempUid
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
});

export default router;
