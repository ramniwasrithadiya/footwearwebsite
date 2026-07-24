import express from 'express';
import pool from '../db';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { companyName, contactName, email, mobile, city, state, gstNumber, message } = req.body;
    
    await pool.query(
      'INSERT INTO dealer_requests (company_name, contact_name, email, mobile, city, state, gst_number, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [companyName, contactName, email, mobile, city, state, gstNumber, message]
    );

    res.status(201).json({ success: true, message: 'Request submitted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit request' });
  }
});

export default router;
