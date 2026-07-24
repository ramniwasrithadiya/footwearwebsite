import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import authRoutes from './server/routes/authRoutes';
import productRoutes from './server/routes/productRoutes';
import wishlistRoutes from './server/routes/wishlistRoutes';
import orderRoutes from './server/routes/orderRoutes';
import adminRoutes from './server/routes/adminRoutes';
import dealerRoutes from './server/routes/dealerRoutes';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Razorpay Initialization
  let razorpay: Razorpay | null = null;
  const getRazorpay = () => {
    if (!razorpay) {
      const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID';
      const keySecret = process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET';
      razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });
    }
    return razorpay;
  };

  app.post('/api/create-razorpay-order', async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.json({
          id: `order_mock_${Date.now()}`,
          amount: Math.round(amount * 100),
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          keyId: "mock_test_key",
          isMock: true
        });
      }
      
      const rzp = getRazorpay();
      const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      };
      
      const order = await rzp.orders.create(options);
      res.json({ ...order, keyId: process.env.RAZORPAY_KEY_ID });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

  app.post('/api/verify-razorpay-payment', (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const secret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!secret) throw new Error('Razorpay secret not configured');
      
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac("sha256", secret).update(body.toString()).digest("hex");
        
      if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/wishlist', wishlistRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/dealer', dealerRoutes);

  // Fallback for previous endpoint URLs used in the app if they were different
  app.use('/api/auth/register.php', authRoutes);
  app.use('/api/endpoints/wishlist.php', wishlistRoutes);
  app.use('/api/endpoints/orders.php', orderRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
