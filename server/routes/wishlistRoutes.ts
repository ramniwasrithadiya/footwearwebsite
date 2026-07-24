import express from 'express';
import pool from '../db';
import { verifyAuth, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const user_id = req.mysqlUser.id;

    const [items]: any = await pool.query(
      'SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?',
      [user_id]
    );

    if (!items || items.length === 0) {
      return res.status(200).json({ success: true, items: [] });
    }

    for (let product of items) {
      const [images]: any = await pool.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [product.id]);
      product.images = images.map((img: any) => img.image_url);
      product.image = product.images[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800';
    }

    res.status(200).json({ success: true, items });
  } catch (error: any) {
    console.error("Wishlist GET Error:", error);
    res.status(500).json({ success: false, message: 'Error fetching wishlist', error: error.message });
  }
});

router.post('/', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const { items } = req.body;
    
    if (!items) {
      return res.status(400).json({ success: false, message: 'Incomplete data' });
    }

    const user_id = req.mysqlUser.id;

    // We do a full sync here (delete all and re-insert)
    await pool.query('DELETE FROM wishlist WHERE user_id = ?', [user_id]);

    for (const item of items) {
      if (item.id) {
        await pool.query('INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)', [user_id, item.id]);
      }
    }

    res.status(200).json({ success: true, message: 'Wishlist synced' });
  } catch (error: any) {
    console.error("Wishlist POST Error:", error);
    res.status(500).json({ success: false, message: 'Error syncing wishlist', error: error.message });
  }
});

export default router;
