import express from 'express';
import pool from '../db';
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
const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const firebase_uid = req.headers['authorization']?.split('Bearer ')[1];
  if (!firebase_uid) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  
  try {
    const [users]: any = await pool.query('SELECT is_admin FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    if (users.length > 0 && users[0].is_admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', success: false });
  }
};

// Check if user is admin
router.get('/check', async (req, res) => {
  const firebase_uid = req.headers['authorization']?.split('Bearer ')[1];
  if (!firebase_uid) return res.json({ isAdmin: false });
  
  try {
    const [users]: any = await pool.query('SELECT is_admin FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    res.json({ isAdmin: users.length > 0 && users[0].is_admin });
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

    if (req.files && Array.isArray(req.files)) {
      for (let i = 0; i < req.files.length; i++) {
        await pool.query(
          'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
          [productId, `/uploads/${req.files[i].filename}`, i]
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
