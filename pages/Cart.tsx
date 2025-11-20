import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const handleCheckout = async () => {
    // Simulate API call
    const order = {
        id: Math.random().toString(36).substr(2, 9),
        items: cart,
        total: cartTotal,
        customer: { name: "Guest", email: "guest@example.com", address: "123 Gym St" },
        status: 'pending' as const,
        createdAt: new Date().toISOString()
    };

    await api.orders.create(order);
    clearCart();
    alert('Order placed successfully! (This is a demo)');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-heading font-bold mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-gray-400 mb-8">Time to gear up.</p>
        <Link to="/men" className="bg-white text-brand-black px-8 py-3 font-bold hover:bg-brand-gold transition-colors">
          SHOP MEN
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black py-12 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold mb-8 border-b border-brand-gray pb-4">SHOPPING CART</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 sm:gap-8 bg-brand-dark p-4 border border-brand-gray">
                <div className="w-24 h-32 bg-brand-gray flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-brand-gray">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-2 hover:text-brand-gold"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-2 hover:text-brand-gold"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-96 h-fit bg-brand-dark p-8 border border-brand-gray">
            <h3 className="font-heading font-bold text-xl mb-6">ORDER SUMMARY</h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-white">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-brand-gray pt-4 mb-8 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-gold text-brand-black py-4 font-bold uppercase hover:bg-white transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;