import express from 'express';
import pool from '../db';
import { verifyAuth, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const user_id = req.mysqlUser.id;

    const [items]: any = await pool.query(`
      SELECT c.*, p.name, p.price, p.slug, p.description, p.category, p.brand, p.sale_price, p.featured
      FROM cart c 
      JOIN products p ON c.product_id = p.id 
      WHERE c.user_id = ?
    `, [user_id]);

    if (!items || items.length === 0) {
      return res.status(200).json({ success: true, items: [] });
    }

    for (let item of items) {
      const [images]: any = await pool.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [item.product_id]);
      const [stock]: any = await pool.query('SELECT size, quantity FROM product_stock WHERE product_id = ?', [item.product_id]);
      
      item.product = {
        id: item.product_id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        category: item.category,
        brand: item.brand,
        price: item.price,
        sale_price: item.sale_price,
        featured: item.featured === 1,
        images: images.map((img: any) => img.image_url),
        image: images.length > 0 ? images[0].image_url : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        sizes: stock.map((s: any) => s.size),
        stock: stock
      };
      
      // Cleanup flat row fields not needed anymore
      delete item.name;
      delete item.price;
      delete item.slug;
      delete item.description;
      delete item.category;
      delete item.brand;
      delete item.sale_price;
      delete item.featured;
    }

    res.status(200).json({ success: true, items });
  } catch (error: any) {
    console.error("Cart GET Error:", error);
    res.status(500).json({ success: false, message: 'Error fetching cart', error: error.message });
  }
});

router.post('/', verifyAuth, async (req: AuthRequest, res) => {
  try {
    const { items } = req.body;
    
    if (!items) {
      return res.status(400).json({ success: false, message: 'Incomplete data' });
    }

    const user_id = req.mysqlUser.id;

    // Full sync: delete and re-insert
    await pool.query('DELETE FROM cart WHERE user_id = ?', [user_id]);

    for (const item of items) {
      if (item.product && item.product.id) {
        await pool.query(
          'INSERT INTO cart (user_id, product_id, size, quantity) VALUES (?, ?, ?, ?)', 
          [user_id, item.product.id, item.size, item.quantity]
        );
      }
    }

    res.status(200).json({ success: true, message: 'Cart synced' });
  } catch (error: any) {
    console.error("Cart POST Error:", error);
    res.status(500).json({ success: false, message: 'Error syncing cart', error: error.message });
  }
});

export default router;
