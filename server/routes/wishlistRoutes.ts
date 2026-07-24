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

    const [items]: any = await pool.query(
      'SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?',
      [user_id]
    );

    for (let product of items) {
      const [images]: any = await pool.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [product.id]);
      product.images = images.map((img: any) => img.image_url);
      product.image = product.images[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800';
    }

    res.status(200).json({ success: true, items });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching wishlist' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firebase_uid, items } = req.body;
    if (!firebase_uid || !items) return res.status(400).json({ success: false, message: 'Incomplete data' });

    const [users]: any = await pool.query('SELECT id FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    const user_id = users[0].id;

    // We do a full sync here (delete all and re-insert)
    await pool.query('DELETE FROM wishlist WHERE user_id = ?', [user_id]);

    for (const item of items) {
      // Find product by id (might be string, or actually id from mysql)
      // Wait, if it's string id from firestore, we have a mismatch!
      // In the new system, we use INT ids. So items[i].id should be int.
      await pool.query('INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)', [user_id, item.id]);
    }

    res.status(200).json({ success: true, message: 'Wishlist synced' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error syncing wishlist' });
  }
});

export default router;
