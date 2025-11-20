import { Product, BlogPost, Order, User } from '../types';
import { SEED_PRODUCTS, SEED_BLOGS } from '../constants';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage keys
const KEYS = {
  PRODUCTS: 'fighter_products',
  BLOGS: 'fighter_blogs',
  ORDERS: 'fighter_orders',
  USER: 'fighter_user'
};

// Initialize storage
const initStorage = () => {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.BLOGS)) {
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(SEED_BLOGS));
  }
};

initStorage();

// --- API Methods ---

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);
      return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
    },
    getBySlug: async (slug: string): Promise<Product | undefined> => {
      await delay(300);
      const products: Product[] = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
      return products.find(p => p.slug === slug);
    },
    create: async (product: Product): Promise<Product> => {
      await delay(600);
      const products: Product[] = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
      products.push(product);
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      return product;
    },
    update: async (id: string, updates: Partial<Product>): Promise<Product> => {
        await delay(400);
        const products: Product[] = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
        const index = products.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Product not found");
        products[index] = { ...products[index], ...updates };
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
        return products[index];
    },
    delete: async (id: string): Promise<void> => {
        await delay(400);
        const products: Product[] = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
    }
  },
  blog: {
    getAll: async (): Promise<BlogPost[]> => {
      await delay(500);
      return JSON.parse(localStorage.getItem(KEYS.BLOGS) || '[]');
    },
    getBySlug: async (slug: string): Promise<BlogPost | undefined> => {
      await delay(300);
      const blogs: BlogPost[] = JSON.parse(localStorage.getItem(KEYS.BLOGS) || '[]');
      return blogs.find(b => b.slug === slug);
    },
    create: async (post: BlogPost): Promise<BlogPost> => {
        await delay(600);
        const blogs: BlogPost[] = JSON.parse(localStorage.getItem(KEYS.BLOGS) || '[]');
        blogs.push(post);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(blogs));
        return post;
    },
    delete: async (id: string): Promise<void> => {
        await delay(400);
        const blogs: BlogPost[] = JSON.parse(localStorage.getItem(KEYS.BLOGS) || '[]');
        const filtered = blogs.filter(b => b.id !== id);
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(filtered));
    }
  },
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(800);
      if (email === 'admin@fighter.com' && password === 'admin123') {
        const user: User = { id: 'u1', name: 'Admin', email, role: 'admin', token: 'mock-jwt-token' };
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
        return user;
      }
      throw new Error('Invalid credentials');
    },
    logout: async () => {
      localStorage.removeItem(KEYS.USER);
    },
    getCurrentUser: (): User | null => {
      const u = localStorage.getItem(KEYS.USER);
      return u ? JSON.parse(u) : null;
    }
  },
  orders: {
      create: async (order: Order): Promise<Order> => {
          await delay(1000);
          const orders: Order[] = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
          orders.push(order);
          localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
          return order;
      },
      getAll: async (): Promise<Order[]> => {
          await delay(500);
          return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
      }
  }
};