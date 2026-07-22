const fs = require('fs');

const baseCategories = ['heels', 'flats', 'sandals', 'boots'];
let products = [];
let idCounter = 1;

const images = {
  heels: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  flats: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  sandals: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  boots: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

const names = {
  heels: ['Classic Stiletto', 'Pointed Toe Slingback', 'Block Heel Pump', 'Strappy Platform Heel', 'Ankle Strap Sandal Heel', 'Peep Toe Pump', 'Kitten Heel Mule', 'Suede Court Shoe', 'Patent Leather Heel', 'Gladiator Heel', 'Lace-Up Heel', 'Dorsay Pump', 'Chunky Heel Pump', 'T-Strap Heel', 'Cone Heel Shoe', 'Wedge Heel Sandal', 'Mary Jane Heel', 'Clear Vinyl Heel', 'Embellished Evening Heel', 'Slingback Kitten Heel'],
  flats: ['Leather Ballet Flat', 'Pointed Toe Loafer', 'Suede Moccasin', 'Slip-On Sneaker', 'Espadrille Flat', 'Mule Flat', 'Dorsay Flat', 'Ankle Strap Flat', 'Tassel Loafer', 'Penny Loafer', 'Oxford Flat', 'Quilted Ballet Flat', 'Foldable Travel Flat', 'Embellished Flat', 'Canvas Slip-On', 'Velvet Loafer', 'Mary Jane Flat', 'Woven Leather Flat', 'Cutout Flat', 'Platform Oxford'],
  sandals: ['Strappy Block Sandal', 'Flat Slide Sandal', 'Gladiator Sandal', 'Wedge Sandal', 'Espadrille Wedge', 'T-Strap Sandal', 'Ankle Strap Sandal', 'Sporty Platform Sandal', 'Leather Thong Sandal', 'Heeled Mule Sandal', 'Lace-Up Sandal', 'Toe Ring Sandal', 'Chunky Platform Sandal', 'Studded Sandal', 'Woven Slide', 'Metallic Ankle Sandal', 'Braided Strap Sandal', 'Vinyl Slide Sandal', 'Cork Wedge Sandal', 'Slingback Sandal'],
  boots: ['Ankle Chelsea Boot', 'Knee-High Suede Boot', 'Over-the-Knee Boot', 'Combat Boot', 'Chunky Platform Boot', 'Slouch Boot', 'Western Cowboy Boot', 'Lace-Up Ankle Boot', 'Sock Boot', 'Riding Boot', 'Snow Boot', 'Rain Boot', 'Shearling Lined Boot', 'Hiker Boot', 'Cutout Ankle Boot', 'Peep Toe Bootie', 'Fringe Boot', 'Motorcycle Boot', 'Wedge Boot', 'Patent Leather Boot']
};

for (const cat of baseCategories) {
  for (let i = 0; i < 20; i++) {
    const isNew = i < 4;
    const isBest = i > 3 && i < 8;
    
    products.push({
      id: idCounter.toString(),
      name: names[cat][i] + (cat === 'heels' && !names[cat][i].toLowerCase().includes('heel') ? ' Heels' : '') ,
      price: 2999 + Math.floor(Math.random() * 4000),
      description: `Premium ${names[cat][i].toLowerCase()} crafted for ultimate comfort and style. Perfect for your everyday or special occasions.`,
      image: images[cat],
      category: cat,
      ...(isNew ? { isNewArrival: true } : {}),
      ...(isBest ? { isBestSeller: true } : {}),
      sizes: [36, 37, 38, 39, 40],
      colors: ['Black', 'Brown', 'Nude', 'White'].slice(0, 2 + Math.floor(Math.random() * 2)),
    });
    idCounter++;
  }
}

const fileContent = `import { Product, Review } from './types';

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Exceptional quality! The stiletto heels I ordered for a gala were perfect. The craftsmanship is highly visible.',
    date: '2025-10-15',
  },
  {
    id: 'r2',
    name: 'Neha Singh',
    rating: 5,
    comment: 'We have been ordering in bulk for our boutique. The MOQ is reasonable and the wholesale pricing gives us great margins. Highly recommended for B2B.',
    date: '2025-11-02',
  },
  {
    id: 'r3',
    name: 'Anjali Patel',
    rating: 4,
    comment: 'Very comfortable flats. Delivery took a bit longer than expected, but the product quality makes up for it.',
    date: '2025-12-20',
  }
];
`;

fs.writeFileSync('src/data.ts', fileContent);
