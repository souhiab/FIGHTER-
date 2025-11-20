import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Trophy } from 'lucide-react';
import HeroAnimation from '../components/HeroAnimation';
import { api } from '../services/api';
import { BlogPost, Product } from '../types';
import { BRAND_TAGLINE } from '../constants';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    api.products.getAll().then(products => {
      // Get best sellers and limit to 4
      setFeaturedProducts(products.filter(p => p.isBestSeller).slice(0, 4));
    });
    api.blog.getAll().then(blogs => {
      setLatestBlogs(blogs.slice(0, 3));
    });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] bg-brand-black overflow-hidden flex flex-col md:flex-row">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black z-10 pointer-events-none" />

        {/* Text Content */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-20 pt-20 md:pt-0">
          <div className="animate-slide-up">
            <h2 className="text-brand-gold font-bold tracking-widest mb-4 uppercase text-sm">Est. 2024</h2>
            <h1 className="text-6xl md:text-8xl font-heading font-bold leading-none mb-6">
              {BRAND_TAGLINE.toUpperCase()}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              Engineered for the bar, the gym, and the street. Premium apparel for those who fight for who they are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/men" className="bg-white text-brand-black px-8 py-4 font-bold hover:bg-brand-gold transition-colors text-center uppercase tracking-wide">
                Shop Men
              </Link>
              <Link to="/women" className="border border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-brand-black transition-colors text-center uppercase tracking-wide">
                Shop Women
              </Link>
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="flex-1 relative flex items-center justify-center bg-brand-dark/30">
           <HeroAnimation />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">BEST SELLERS</h2>
              <div className="h-1 w-20 bg-brand-gold"></div>
            </div>
            <Link to="/best-selling" className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <Link to={`/product/${product.slug}`} key={product.id} className="group block">
                <div className="relative aspect-[4/5] bg-brand-gray overflow-hidden mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-brand-gold text-brand-black text-xs font-bold px-2 py-1 uppercase">
                      Best Seller
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-lg group-hover:text-brand-gold transition-colors">{product.name}</h3>
                <p className="text-gray-400">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Vibe */}
      <section className="py-24 bg-brand-dark border-y border-brand-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-black p-8 border border-brand-gray hover:border-brand-gold transition-colors group">
              <Zap className="h-10 w-10 text-brand-gold mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Performance First</h3>
              <p className="text-gray-400">Fabrics designed to withstand the friction of the bar and the intensity of the grind.</p>
            </div>
            <div className="bg-brand-black p-8 border border-brand-gray hover:border-brand-gold transition-colors group">
              <Shield className="h-10 w-10 text-brand-gold mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Built To Last</h3>
              <p className="text-gray-400">From double-stitched seams to reinforced panels, we don't cut corners.</p>
            </div>
            <div className="bg-brand-black p-8 border border-brand-gray hover:border-brand-gold transition-colors group">
              <Trophy className="h-10 w-10 text-brand-gold mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4">Join The Ranks</h3>
              <p className="text-gray-400">A community of bar fighters and heavy lifters supporting each other.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-brand-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">LATEST INTEL</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map(blog => (
              <article key={blog.id} className="flex flex-col h-full group">
                <div className="aspect-video overflow-hidden mb-6 bg-brand-gray">
                  <img
                     src={blog.thumbnailImage}
                     alt={blog.title}
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 block">{blog.category}</span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-gold transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                </div>
                <Link to={`/blog/${blog.slug}`} className="text-sm font-bold underline underline-offset-4 hover:text-brand-gold">
                  READ ARTICLE
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white text-brand-black">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">DON'T MISS THE DROP</h2>
          <p className="text-gray-600 mb-8">Join the Fighter community for exclusive training tips, early access to new releases, and 10% off your first order.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-gray-100 border border-gray-300 px-6 py-4 font-bold placeholder:font-normal focus:border-brand-black outline-none"
            />
            <button className="bg-brand-black text-white px-8 py-4 font-bold hover:bg-brand-gold hover:text-black transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;