import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';
import { Request, Response, NextFunction } from 'express';
import pool from '../db';



if (!getApps().length) {
  initializeApp({ projectId: 'emailmobileauth-8090c' });
}

export interface AuthRequest extends Request {
  user?: any; // Contains the decoded token or the MySQL user record
  mysqlUser?: any; // The MySQL user record
}

export const verifyAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email || '';
    const mobile = decodedToken.phone_number || '';
    const name = decodedToken.name || '';
    let first_name = '';
    let last_name = '';

    if (name) {
      const parts = name.split(' ');
      first_name = parts[0];
      last_name = parts.slice(1).join(' ');
    }

    // Look up user in MySQL
    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);

    if (users.length === 0) {
      // Auto-create user if they don't exist
      const [result]: any = await pool.query(
        'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
        [firebase_uid, first_name, last_name, name, email, mobile]
      );
      
      const insertId = result.insertId;
      const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [insertId]);
      req.mysqlUser = newUsers[0];
    } else {
      req.mysqlUser = users[0];
    }

    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED' || error.fatal) {
      return res.status(503).json({ success: false, message: 'Database connection failed' });
    }
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token', error: error.message });
  }
};

export const verifyOptionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;

    const firebase_uid = decodedToken.uid;
    const email = decodedToken.email || '';
    const mobile = decodedToken.phone_number || '';
    const name = decodedToken.name || '';
    let first_name = '';
    let last_name = '';

    if (name) {
      const parts = name.split(' ');
      first_name = parts[0];
      last_name = parts.slice(1).join(' ');
    }

    let [users]: any = await pool.query('SELECT * FROM users WHERE firebase_uid = ? LIMIT 1', [firebase_uid]);

    if (users.length === 0) {
      const [result]: any = await pool.query(
        'INSERT INTO users (firebase_uid, first_name, last_name, full_name, email, mobile) VALUES (?, ?, ?, ?, ?, ?)',
        [firebase_uid, first_name, last_name, name, email, mobile]
      );
      const [newUsers]: any = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      req.mysqlUser = newUsers[0];
    } else {
      req.mysqlUser = users[0];
    }
    next();
  } catch (error: any) {
    console.error("Optional Auth Middleware Error:", error);
    // Ignore error for optional auth and just proceed as guest
    next();
  }
};
