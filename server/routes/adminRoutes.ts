import express from 'express';
import pool from '../db';
import { verifyAuth, AuthRequest } from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin Middleware
const isAdmin = [verifyAuth, async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.mysqlUser && req.mysqlUser.is_admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admin access required', success: false });
    }
  } catch (error) {
    console.error('Admin Auth Error:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
}];

// Check if user is admin
router.get('/check', verifyAuth, async (req: AuthRequest, res) => {
  try {
    res.json({ isAdmin: req.mysqlUser?.is_admin === 1 });
  } catch (error) {
    res.json({ isAdmin: false });
  }
});

router.post('/products', isAdmin, upload.array('images', 10), async (req, res) => {
  try {
    const { name, slug, description, category, brand, price, sale_price, featured, sizes } = req.body;
    const parsedSizes = JSON.parse(sizes || '[]'); // array of {size, quantity}

    const [productRes]: any = await pool.query(
      'INSERT INTO products (name, slug, description, category, brand, price, sale_price, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, slug, description, category, brand, price, sale_price || null, featured === 'true']
    );
    const productId = productRes.insertId;

    if ((req as any).files && Array.isArray((req as any).files)) {
      for (let i = 0; i < (req as any).files.length; i++) {
        await pool.query(
          'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
          [productId, `/uploads/${(req as any).files[i].filename}`, i]
        );
      }
    }

    for (const s of parsedSizes) {
      await pool.query(
        'INSERT INTO product_stock (product_id, size, quantity) VALUES (?, ?, ?)',
        [productId, s.size, s.quantity]
      );
    }

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product', success: false });
  }
});

router.put('/products/:id', isAdmin, async (req, res) => {
  try {
    const { name, slug, description, category, brand, price, sale_price, featured, sizes } = req.body;
    
    await pool.query(
      'UPDATE products SET name=?, slug=?, description=?, category=?, brand=?, price=?, sale_price=?, featured=? WHERE id=?',
      [name, slug, description, category, brand, price, sale_price || null, featured, req.params.id]
    );

    if (sizes) {
      for (const s of sizes) {
        // Upsert logic for MySQL: INSERT ... ON DUPLICATE KEY UPDATE
        await pool.query(
          'INSERT INTO product_stock (product_id, size, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity=?',
          [req.params.id, s.size, s.quantity, s.quantity]
        );
      }
    }

    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', success: false });
  }
});

router.delete('/products/:id', isAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', success: false });
  }
});

router.get('/dealer-requests', isAdmin, async (req, res) => {
  try {
    const [requests]: any = await pool.query('SELECT * FROM dealer_requests ORDER BY created_at DESC');
    res.status(200).json({ success: true, requests });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch dealer requests', success: false });
  }
});

export default router;

// Orders API
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const [orders]: any = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Customers API
router.get('/customers', isAdmin, async (req, res) => {
  try {
    const [customers]: any = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.status(200).json({ success: true, customers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
