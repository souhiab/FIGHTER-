export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Men' | 'Women' | 'Unisex';
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isBestSeller: boolean;
  isActive: boolean;
  stock: number;
  tags: string[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnailImage: string;
  publishedAt: string;
  isPublished: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  token?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  status: 'pending' | 'completed';
  createdAt: string;
}