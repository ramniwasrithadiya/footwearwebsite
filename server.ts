import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
        amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      };
      
      const order = await rzp.orders.create(options);
      const keyId = process.env.RAZORPAY_KEY_ID;
      res.json({ ...order, keyId: keyId });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

  app.post('/api/verify-razorpay-payment', (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        throw new Error('Razorpay secret not configured');
      }
      
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");
        
      const isAuthentic = expectedSignature === razorpay_signature;
      
      if (isAuthentic) {
        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
