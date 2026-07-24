import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [products]: any = await pool.query('SELECT * FROM products WHERE status = "active"');
    
    for (let product of products) {
      const [images]: any = await pool.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [product.id]);
      product.images = images.map((img: any) => img.image_url);
      product.image = product.images[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'; // fallback
      
      const [stock]: any = await pool.query('SELECT size, quantity FROM product_stock WHERE product_id = ?', [product.id]);
      product.sizes = stock.map((s: any) => s.size);
      product.stock = stock;
    }

    res.status(200).json({ success: true, products });
  } catch (error: any) {
    console.error('Products fetch error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const [products]: any = await pool.query('SELECT * FROM products WHERE slug = ? LIMIT 1', [req.params.slug]);
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found', success: false });
    }
    
    const product = products[0];
    const [images]: any = await pool.query('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [product.id]);
    product.images = images.map((img: any) => img.image_url);
    product.image = product.images[0] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800';

    const [stock]: any = await pool.query('SELECT size, quantity FROM product_stock WHERE product_id = ?', [product.id]);
    product.sizes = stock.map((s: any) => s.size);
    product.stock = stock;

    res.status(200).json({ success: true, product });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

export default router;
