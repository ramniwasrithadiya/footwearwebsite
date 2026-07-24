export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'heels' | 'flats' | 'boots' | 'sandals';
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  sizes: number[];
  colors: string[];
  stock?: {size: number, quantity: number}[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
