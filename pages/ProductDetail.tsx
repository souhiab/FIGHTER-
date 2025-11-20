import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    setLoading(true);
    if (slug) {
      api.products.getBySlug(slug).then(data => {
        setProduct(data || null);
        if (data) {
            setMainImage(data.images[0]);
            setSelectedColor(data.colors[0]);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addToCart(product, selectedSize, selectedColor);
    alert('Added to cart!'); // Simple feedback
  };

  if (loading) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Product not found</div>;

  return (
    <div className="bg-brand-black min-h-screen text-white pt-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-brand-gray w-full overflow-hidden">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square border-2 ${mainImage === img ? 'border-brand-gold' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-2 text-brand-gold font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              {product.isBestSeller && <span className="flex items-center gap-1"><Star size={14} fill="currentColor"/> Best Seller</span>}
              <span>{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{product.name}</h1>
            <p className="text-2xl mb-8">${product.price.toFixed(2)}</p>

            <div className="mb-8 text-gray-400 leading-relaxed">
              {product.description}
            </div>

            {/* Config */}
            <div className="space-y-6 mb-10">
              <div>
                <span className="block text-sm font-bold uppercase mb-3 text-gray-400">Color: <span className="text-white">{selectedColor}</span></span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-sm font-bold ${
                        selectedColor === color
                        ? 'border-brand-gold text-brand-gold'
                        : 'border-brand-gray text-gray-400 hover:border-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold uppercase mb-3 text-gray-400">Size: {selectedSize || 'Select size'}</span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border font-bold transition-all ${
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
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-5 font-heading font-bold text-xl uppercase tracking-widest transition-colors mb-6 ${
                selectedSize
                  ? 'bg-brand-gold text-brand-black hover:bg-brand-goldHover'
                  : 'bg-brand-gray text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-brand-gray">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-gold" />
                <span className="text-sm text-gray-300">30-Day Warrior Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-brand-gold" />
                <span className="text-sm text-gray-300">Free Shipping Over $100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;