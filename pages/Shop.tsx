import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';

interface ShopProps {
  category?: 'Men' | 'Women';
  bestSellersOnly?: boolean;
}

const Shop: React.FC<ShopProps> = ({ category, bestSellersOnly }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Filter States
  const [priceRange, setPriceRange] = useState<number>(100);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.products.getAll().then(data => {
      let filtered = data;

      if (category) {
        filtered = filtered.filter(p => p.category === category || p.category === 'Unisex');
      }
      if (bestSellersOnly) {
        filtered = filtered.filter(p => p.isBestSeller);
      }

      setProducts(filtered);
      setLoading(false);
    });
  }, [category, bestSellersOnly]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.price <= priceRange);

    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (using id as proxy or createdAt)
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [products, priceRange, selectedSize, sortBy]);

  const uniqueSizes = Array.from(new Set(products.flatMap(p => p.sizes))).sort();

  return (
    <div className="bg-brand-black min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">
            {bestSellersOnly ? 'Best Sellers' : `Shop ${category || 'All'}`}
          </h1>
          <p className="text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-8`}>
            <div>
              <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-brand-dark border border-brand-gray text-white p-3 text-sm focus:border-brand-gold outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div>
              <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Max Price: ${priceRange}</h3>
              <input
                type="range"
                min="20"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-brand-gray rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$20</span>
                <span>$200+</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Size</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`w-10 h-10 flex items-center justify-center border text-sm transition-colors ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'border-brand-gray text-gray-400 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden w-full bg-brand-dark border border-brand-gray p-4 flex items-center justify-between font-bold uppercase"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span>Filters & Sort</span>
            <Filter size={18} />
          </button>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading gear...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-500 border border-brand-gray border-dashed">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <Link to={`/product/${product.slug}`} key={product.id} className="group">
                    <div className="relative aspect-[4/5] bg-brand-gray overflow-hidden mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-1 uppercase">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                      </div>
                      <span className="text-gray-300 font-bold">${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;