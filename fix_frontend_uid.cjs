const fs = require('fs');

let profile = fs.readFileSync('src/pages/Profile.tsx', 'utf8');
profile = profile.replace("api.get(`/orders?firebase_uid=${user.uid}`);", "api.get(`/orders`);");
fs.writeFileSync('src/pages/Profile.tsx', profile);

let auth = fs.readFileSync('src/AuthContext.tsx', 'utf8');
auth = auth.replace("api.get(`/auth/profile?firebase_uid=${user.uid}`);", "api.get(`/auth/profile`);");
fs.writeFileSync('src/AuthContext.tsx', auth);

let checkout = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');
checkout = checkout.replace("firebase_uid: user?.uid,", "");
fs.writeFileSync('src/pages/Checkout.tsx', checkout);

