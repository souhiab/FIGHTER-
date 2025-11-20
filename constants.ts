import { Product, BlogPost } from './types';

export const BRAND_NAME = "FIGHTER";
export const BRAND_TAGLINE = "No Days Off";

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Stealth Performance Tee',
    slug: 'stealth-performance-tee',
    category: 'Men',
    price: 35.00,
    description: 'Engineered for high-intensity calisthenics. Sweat-wicking fabric with a muscle-fit cut.',
    images: ['https://picsum.photos/id/1005/800/1000', 'https://picsum.photos/id/1005/800/1001'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    isBestSeller: true,
    isActive: true,
    stock: 50,
    tags: ['t-shirt', 'performance', 'tops'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    name: 'Heavy Duty Joggers',
    slug: 'heavy-duty-joggers',
    category: 'Men',
    price: 55.00,
    description: 'Durable cotton blend perfect for cold starts and heavy squats.',
    images: ['https://picsum.photos/id/1012/800/1000'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    isBestSeller: false,
    isActive: true,
    stock: 30,
    tags: ['bottoms', 'joggers'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    name: 'Apex Sports Bra',
    slug: 'apex-sports-bra',
    category: 'Women',
    price: 40.00,
    description: 'Maximum support for dynamic movements. Muscle-back design.',
    images: ['https://picsum.photos/id/338/800/1000'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Red'],
    isBestSeller: true,
    isActive: true,
    stock: 45,
    tags: ['bra', 'tops'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p4',
    name: 'Flex Leggings',
    slug: 'flex-leggings',
    category: 'Women',
    price: 60.00,
    description: 'Squat-proof, high-waisted leggings that move with you.',
    images: ['https://picsum.photos/id/342/800/1000'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy'],
    isBestSeller: true,
    isActive: true,
    stock: 60,
    tags: ['bottoms', 'leggings'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p5',
    name: 'BarFighter Oversized Hoodie',
    slug: 'barfighter-hoodie',
    category: 'Unisex',
    price: 75.00,
    description: 'Heavyweight pump cover. Drop shoulder fit.',
    images: ['https://picsum.photos/id/669/800/1000'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gold'],
    isBestSeller: false,
    isActive: true,
    stock: 20,
    tags: ['hoodie', 'outerwear'],
    createdAt: new Date().toISOString()
  }
];

export const SEED_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Mastering the Muscle Up',
    slug: 'mastering-muscle-up',
    excerpt: 'The ultimate guide to transitioning from pull-up to dip in one fluid motion.',
    content: 'The muscle-up is the holy grail of calisthenics...',
    category: 'Workout',
    thumbnailImage: 'https://picsum.photos/id/1060/800/400',
    publishedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 'b2',
    title: 'Recovery Protocols for Athletes',
    slug: 'recovery-protocols',
    excerpt: 'Why sleep and nutrition matter more than your training volume.',
    content: 'You don\'t grow when you train, you grow when you sleep...',
    category: 'Recovery',
    thumbnailImage: 'https://picsum.photos/id/1025/800/400',
    publishedAt: new Date().toISOString(),
    isPublished: true
  },
  {
    id: 'b3',
    title: 'The Push-Pull-Legs Split',
    slug: 'ppl-split',
    excerpt: 'Organize your week for maximum hypertrophy and strength gains.',
    content: 'A classic split that hits every muscle group twice a week...',
    category: 'Mindset',
    thumbnailImage: 'https://picsum.photos/id/98/800/400',
    publishedAt: new Date().toISOString(),
    isPublished: true
  }
];