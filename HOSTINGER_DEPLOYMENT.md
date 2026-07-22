# Hostinger Premium Deployment Guide

This project is structured with a React frontend and a pure PHP 8.3 REST API backend, using MySQL as the database. It is fully deployable to Hostinger Premium hosting.

## Folder Structure

Your repository is now structured like this:
```
/
├── backend/               # PHP REST API (Upload to Hostinger public_html/api)
│   ├── database/          # Contains the MySQL schema (.sql file)
│   ├── api/
│       ├── config/        # database.php & jwt_helper.php
│       ├── auth/          # login.php, register.php
│       ├── endpoints/     # products.php, contact.php, etc.
│       └── utils/         # Validation functions
├── src/                   # React Frontend Source Code
│   ├── api/               # Axios configuration pointing to your PHP API
│   ├── components/        # React Components
│   └── pages/             # React Pages
└── package.json           # Frontend dependencies
```

## Step 1: Database Setup on Hostinger

1. Log into your **Hostinger hPanel**.
2. Go to **Databases** > **Management**.
3. Create a new MySQL Database (e.g., `u123456789_handcrafted`) and Database User. Make sure to generate a strong password.
4. Click on **Enter phpMyAdmin**.
5. In phpMyAdmin, click the **Import** tab.
6. Upload the `backend/database/handcrafted_heels_schema.sql` file and click **Go**. This will create all 22 normalized tables and insert sample data.

## Step 2: Configure the PHP API

1. Open `backend/api/config/database.php`.
2. Update the credentials with the database name, username, and password you created in Hostinger:
   ```php
   private $db_name = "u123456789_handcrafted"; 
   private $username = "u123456789_user";
   private $password = "YourSecurePassword123!";
   ```
3. Open `backend/api/utils/jwt_helper.php` and change the `$secret_key` to a strong random string.

## Step 3: Upload the Backend to Hostinger

1. In hPanel, go to **Files** > **File Manager**.
2. Navigate to `public_html/`.
3. Create a new folder named `api`.
4. Upload all the contents inside your local `backend/api/` folder directly into the `public_html/api/` directory on Hostinger.

## Step 4: Build and Deploy the React Frontend

1. Ensure the React frontend knows where your PHP API lives. By default, it's configured in `src/api/axios.ts` to look for `import.meta.env.VITE_API_URL`.
2. Create a `.env.production` file in your root folder and add your Hostinger domain API path:
   ```
   VITE_API_URL=https://yourdomain.com/api
   ```
3. Run the build command locally:
   ```bash
   npm run build
   ```
4. This will generate a `dist/` folder.
5. Upload all the contents **inside** the `dist/` folder to your Hostinger `public_html/` folder (keep the `api` folder you created earlier intact!).
6. **Important for React Router:** In `public_html/`, create a `.htaccess` file with the following contents to route all non-API traffic to React's `index.html`:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     # Don't rewrite API requests
     RewriteCond %{REQUEST_URI} !^/api/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     # Don't rewrite API requests
     RewriteCond %{REQUEST_URI} !^/api/
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Step 5: Test the Application

- Visit `https://yourdomain.com` to see the React frontend.
- API requests (like fetching products or logging in) will automatically route to `https://yourdomain.com/api/...` handled by your PDO PHP scripts.
- Use Postman to test `https://yourdomain.com/api/endpoints/products.php` directly if you need to debug.
