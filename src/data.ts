import { Product, Review } from './types';

export const products: Product[] = [
  {
    "id": "1",
    "name": "Classic Stiletto Heels",
    "price": 5727,
    "description": "Premium classic stiletto crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "2",
    "name": "Pointed Toe Slingback Heels",
    "price": 5568,
    "description": "Premium pointed toe slingback crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "3",
    "name": "Block Heel Pump",
    "price": 3061,
    "description": "Premium block heel pump crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "4",
    "name": "Strappy Platform Heel",
    "price": 5089,
    "description": "Premium strappy platform heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "5",
    "name": "Ankle Strap Sandal Heel",
    "price": 6720,
    "description": "Premium ankle strap sandal heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "6",
    "name": "Peep Toe Pump Heels",
    "price": 3546,
    "description": "Premium peep toe pump crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "7",
    "name": "Kitten Heel Mule",
    "price": 5882,
    "description": "Premium kitten heel mule crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "8",
    "name": "Suede Court Shoe Heels",
    "price": 5940,
    "description": "Premium suede court shoe crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "9",
    "name": "Patent Leather Heel",
    "price": 5364,
    "description": "Premium patent leather heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "10",
    "name": "Gladiator Heel",
    "price": 4850,
    "description": "Premium gladiator heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "11",
    "name": "Lace-Up Heel",
    "price": 5260,
    "description": "Premium lace-up heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "12",
    "name": "Dorsay Pump Heels",
    "price": 3752,
    "description": "Premium dorsay pump crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "13",
    "name": "Chunky Heel Pump",
    "price": 3801,
    "description": "Premium chunky heel pump crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "14",
    "name": "T-Strap Heel",
    "price": 4126,
    "description": "Premium t-strap heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "15",
    "name": "Cone Heel Shoe",
    "price": 6900,
    "description": "Premium cone heel shoe crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "16",
    "name": "Wedge Heel Sandal",
    "price": 3946,
    "description": "Premium wedge heel sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "17",
    "name": "Mary Jane Heel",
    "price": 3027,
    "description": "Premium mary jane heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "18",
    "name": "Clear Vinyl Heel",
    "price": 3108,
    "description": "Premium clear vinyl heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "19",
    "name": "Embellished Evening Heel",
    "price": 6609,
    "description": "Premium embellished evening heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "20",
    "name": "Slingback Kitten Heel",
    "price": 3948,
    "description": "Premium slingback kitten heel crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "heels",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "21",
    "name": "Leather Ballet Flat",
    "price": 5818,
    "description": "Premium leather ballet flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "22",
    "name": "Pointed Toe Loafer",
    "price": 6283,
    "description": "Premium pointed toe loafer crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "23",
    "name": "Suede Moccasin",
    "price": 3324,
    "description": "Premium suede moccasin crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "24",
    "name": "Slip-On Sneaker",
    "price": 3934,
    "description": "Premium slip-on sneaker crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "25",
    "name": "Espadrille Flat",
    "price": 4433,
    "description": "Premium espadrille flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "26",
    "name": "Mule Flat",
    "price": 3091,
    "description": "Premium mule flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "27",
    "name": "Dorsay Flat",
    "price": 3337,
    "description": "Premium dorsay flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "28",
    "name": "Ankle Strap Flat",
    "price": 3399,
    "description": "Premium ankle strap flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "29",
    "name": "Tassel Loafer",
    "price": 5751,
    "description": "Premium tassel loafer crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "30",
    "name": "Penny Loafer",
    "price": 5780,
    "description": "Premium penny loafer crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "31",
    "name": "Oxford Flat",
    "price": 6377,
    "description": "Premium oxford flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "32",
    "name": "Quilted Ballet Flat",
    "price": 5339,
    "description": "Premium quilted ballet flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "33",
    "name": "Foldable Travel Flat",
    "price": 5384,
    "description": "Premium foldable travel flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "34",
    "name": "Embellished Flat",
    "price": 4273,
    "description": "Premium embellished flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "35",
    "name": "Canvas Slip-On",
    "price": 3797,
    "description": "Premium canvas slip-on crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "36",
    "name": "Velvet Loafer",
    "price": 4628,
    "description": "Premium velvet loafer crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "37",
    "name": "Mary Jane Flat",
    "price": 3329,
    "description": "Premium mary jane flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "38",
    "name": "Woven Leather Flat",
    "price": 4200,
    "description": "Premium woven leather flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "39",
    "name": "Cutout Flat",
    "price": 3659,
    "description": "Premium cutout flat crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "40",
    "name": "Platform Oxford",
    "price": 3477,
    "description": "Premium platform oxford crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "flats",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "41",
    "name": "Strappy Block Sandal",
    "price": 6808,
    "description": "Premium strappy block sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "42",
    "name": "Flat Slide Sandal",
    "price": 5872,
    "description": "Premium flat slide sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "43",
    "name": "Gladiator Sandal",
    "price": 5446,
    "description": "Premium gladiator sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "44",
    "name": "Wedge Sandal",
    "price": 5934,
    "description": "Premium wedge sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "45",
    "name": "Espadrille Wedge",
    "price": 3687,
    "description": "Premium espadrille wedge crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "46",
    "name": "T-Strap Sandal",
    "price": 6727,
    "description": "Premium t-strap sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "47",
    "name": "Ankle Strap Sandal",
    "price": 6567,
    "description": "Premium ankle strap sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "48",
    "name": "Sporty Platform Sandal",
    "price": 6821,
    "description": "Premium sporty platform sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "49",
    "name": "Leather Thong Sandal",
    "price": 5882,
    "description": "Premium leather thong sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "50",
    "name": "Heeled Mule Sandal",
    "price": 6111,
    "description": "Premium heeled mule sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "51",
    "name": "Lace-Up Sandal",
    "price": 5616,
    "description": "Premium lace-up sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "52",
    "name": "Toe Ring Sandal",
    "price": 5793,
    "description": "Premium toe ring sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "53",
    "name": "Chunky Platform Sandal",
    "price": 3407,
    "description": "Premium chunky platform sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "54",
    "name": "Studded Sandal",
    "price": 3601,
    "description": "Premium studded sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "55",
    "name": "Woven Slide",
    "price": 3845,
    "description": "Premium woven slide crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "56",
    "name": "Metallic Ankle Sandal",
    "price": 5427,
    "description": "Premium metallic ankle sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "57",
    "name": "Braided Strap Sandal",
    "price": 5735,
    "description": "Premium braided strap sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "58",
    "name": "Vinyl Slide Sandal",
    "price": 4563,
    "description": "Premium vinyl slide sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "59",
    "name": "Cork Wedge Sandal",
    "price": 3182,
    "description": "Premium cork wedge sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "60",
    "name": "Slingback Sandal",
    "price": 6853,
    "description": "Premium slingback sandal crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "sandals",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "61",
    "name": "Ankle Chelsea Boot",
    "price": 6267,
    "description": "Premium ankle chelsea boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "62",
    "name": "Knee-High Suede Boot",
    "price": 4285,
    "description": "Premium knee-high suede boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "63",
    "name": "Over-the-Knee Boot",
    "price": 5126,
    "description": "Premium over-the-knee boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "64",
    "name": "Combat Boot",
    "price": 6473,
    "description": "Premium combat boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isNewArrival": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "65",
    "name": "Chunky Platform Boot",
    "price": 6800,
    "description": "Premium chunky platform boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "66",
    "name": "Slouch Boot",
    "price": 6511,
    "description": "Premium slouch boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "67",
    "name": "Western Cowboy Boot",
    "price": 5729,
    "description": "Premium western cowboy boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "68",
    "name": "Lace-Up Ankle Boot",
    "price": 5883,
    "description": "Premium lace-up ankle boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "isBestSeller": true,
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "69",
    "name": "Sock Boot",
    "price": 5187,
    "description": "Premium sock boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "70",
    "name": "Riding Boot",
    "price": 4904,
    "description": "Premium riding boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "71",
    "name": "Snow Boot",
    "price": 4826,
    "description": "Premium snow boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "72",
    "name": "Rain Boot",
    "price": 3001,
    "description": "Premium rain boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "73",
    "name": "Shearling Lined Boot",
    "price": 3394,
    "description": "Premium shearling lined boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "74",
    "name": "Hiker Boot",
    "price": 4235,
    "description": "Premium hiker boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "75",
    "name": "Cutout Ankle Boot",
    "price": 4026,
    "description": "Premium cutout ankle boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown"
    ]
  },
  {
    "id": "76",
    "name": "Peep Toe Bootie",
    "price": 4751,
    "description": "Premium peep toe bootie crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "77",
    "name": "Fringe Boot",
    "price": 6139,
    "description": "Premium fringe boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "78",
    "name": "Motorcycle Boot",
    "price": 3492,
    "description": "Premium motorcycle boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "79",
    "name": "Wedge Boot",
    "price": 4094,
    "description": "Premium wedge boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  },
  {
    "id": "80",
    "name": "Patent Leather Boot",
    "price": 6651,
    "description": "Premium patent leather boot crafted for ultimate comfort and style. Perfect for your everyday or special occasions.",
    "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "category": "boots",
    "sizes": [37, 38, 39, 40, 41, 42],
    "colors": [
      "Black",
      "Brown",
      "Nude"
    ]
  }
];

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
