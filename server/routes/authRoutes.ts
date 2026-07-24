import express from 'express';
import pool from '../db';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firebase_uid, tempUid, first_name, last_name, email, mobile } = req.body;
    if (!firebase_uid || !first_name || !last_name || !email || !mobile) {
      return res.status(400).json({ message: 'Incomplete data.', success: false });
    }

    const full_name = `${first_name} ${last_name}`;
    if (tempUid) {
      const [updateResult]: any = await pool.query(
        'UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ? WHERE firebase_uid = ?',
        [firebase_uid, first_name, last_name, full_name, tempUid]
      );
      if (updateResult.affectedRows > 0) {
        return res.status(200).json({ message: 'User updated successfully', success: true });
      }
    }

    const [existingUsers]: any = await pool.query(
      'SELECT id, firebase_uid FROM users WHERE email = ? OR mobile = ? LIMIT 1',
      [email, mobile]
    );

    if (existingUsers.length > 0) {
      const userId = existingUsers[0].id;
      await pool.query(
        'UPDATE users SET firebase_uid = ?, first_name = ?, last_name = ?, full_name = ? WHERE id = ?',
        [firebase_uid, first_name, last_name, full_name, userId]
      );
      return res.status(200).json({ message: 'User updated successfully', success: true });
    }

    const [result] = await pool.query(
      'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
      [firebase_uid, first_name, last_name, full_name, email, mobile]
    );

    res.status(201).json({ message: 'User created successfully', success: true });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { firebase_uid } = req.query;
    if (!firebase_uid) {
      return res.status(400).json({ message: 'firebase_uid is required.', success: false });
    }

    const [rows]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);
    
    if (rows.length > 0) {
      res.status(200).json({ success: true, profile: rows[0] });
    } else {
      res.status(404).json({ message: 'Profile not found.', success: false });
    }
  } catch (error: any) {
    console.error('Profile Error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

router.get('/mobile_lookup', async (req, res) => {
  try {
    const { mobile } = req.query;
    if (!mobile) {
      return res.status(400).json({ message: 'mobile is required.', success: false });
    }

    const [rows]: any = await pool.query('SELECT email FROM users WHERE mobile = ? LIMIT 1', [mobile]);
    
    if (rows.length > 0) {
      res.status(200).json({ success: true, email: rows[0].email });
    } else {
      res.status(404).json({ message: 'Account not found for this mobile number.', success: false });
    }
  } catch (error: any) {
    console.error('Mobile Lookup Error:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
});

export default router;
