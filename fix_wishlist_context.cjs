const fs = require('fs');
let code = fs.readFileSync('src/WishlistContext.tsx', 'utf8');

code = code.replace(
  "api.get(`/wishlist?firebase_uid=${user.uid}`)",
  "api.get(`/wishlist`)"
);

code = code.replace(
  "await api.post('/wishlist', {\n                firebase_uid: user.uid,\n                items: loadedWishlist\n              });",
  "await api.post('/wishlist', {\n                items: loadedWishlist\n              });"
);

code = code.replace(
  "await api.post('/wishlist', {\n          firebase_uid: user.uid,\n          items: newWishlist\n        });",
  "await api.post('/wishlist', {\n          items: newWishlist\n        });"
);

fs.writeFileSync('src/WishlistContext.tsx', code);
