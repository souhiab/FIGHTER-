import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product, BlogPost, User } from '../types';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<'products' | 'blog'>('products');
  const navigate = useNavigate();

  // Auth State
  const [email, setEmail] = useState('admin@fighter.com');
  const [password, setPassword] = useState('admin123');
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const u = api.auth.getCurrentUser();
    if (u) {
      setUser(u);
      setIsLoginMode(false);
      refreshData();
    }
  }, []);

  const refreshData = () => {
    api.products.getAll().then(setProducts);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await api.auth.login(email, password);
      setUser(u);
      setIsLoginMode(false);
      refreshData();
    } catch (error) {
      alert('Login failed. Use admin@fighter.com / admin123');
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    setUser(null);
    setIsLoginMode(true);
    navigate('/');
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...editingProduct,
      id: editingProduct.id || Math.random().toString(36).substr(2, 9),
      slug: editingProduct.name?.toLowerCase().replace(/ /g, '-') || 'new-product',
      images: editingProduct.images || ['https://picsum.photos/800/1000'],
      sizes: editingProduct.sizes || ['S', 'M', 'L'],
      colors: editingProduct.colors || ['Black'],
      createdAt: new Date().toISOString(),
      tags: [],
      stock: 100,
      isBestSeller: editingProduct.isBestSeller || false,
      isActive: editingProduct.isActive !== undefined ? editingProduct.isActive : true,
    } as Product;

    if (editingProduct.id) {
        await api.products.update(editingProduct.id, productData);
    } else {
        await api.products.create(productData);
    }

    setIsFormOpen(false);
    setEditingProduct({});
    refreshData();
  };

  const handleDeleteProduct = async (id: string) => {
      if(window.confirm("Delete product?")) {
          await api.products.delete(id);
          refreshData();
      }
  }

  if (!user && isLoginMode) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="bg-brand-dark p-8 border border-brand-gray w-full max-w-md">
          <h1 className="text-2xl font-heading font-bold text-white mb-6">ADMIN ACCESS</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-brand-black border border-brand-gray text-white p-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-brand-black border border-brand-gray text-white p-3"
            />
            <button className="w-full bg-brand-gold text-black font-bold py-3 hover:bg-white transition-colors">
              LOGIN
            </button>
            <p className="text-xs text-gray-500 text-center">Hint: admin@fighter.com / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Admin Nav */}
      <nav className="bg-brand-dark border-b border-brand-gray p-4 flex justify-between items-center">
        <h1 className="font-heading font-bold text-xl text-brand-gold">ADMIN DASHBOARD</h1>
        <div className="flex gap-4">
            <button onClick={() => setView('products')} className={`${view === 'products' ? 'text-white underline' : 'text-gray-400'}`}>Products</button>
            <button onClick={() => setView('blog')} className={`${view === 'blog' ? 'text-white underline' : 'text-gray-400'}`}>Blog (Coming Soon)</button>
            <button onClick={handleLogout} className="text-red-500 ml-4">Logout</button>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        {view === 'products' && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <button
                onClick={() => { setEditingProduct({}); setIsFormOpen(true); }}
                className="bg-white text-black px-4 py-2 font-bold hover:bg-brand-gold"
              >
                + New Product
              </button>
            </div>

            {/* Product List */}
            <div className="bg-brand-dark border border-brand-gray overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-brand-gray bg-brand-black">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-brand-gray hover:bg-brand-black/50">
                      <td className="p-4 font-bold">{p.name}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4">${p.price}</td>
                      <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded ${p.isActive ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                              {p.isActive ? 'Active' : 'Draft'}
                          </span>
                          {p.isBestSeller && <span className="ml-2 px-2 py-1 text-xs bg-brand-gold text-black rounded">Hot</span>}
                      </td>
                      <td className="p-4 space-x-2">
                        <button onClick={() => { setEditingProduct(p); setIsFormOpen(true); }} className="text-brand-gold hover:underline">Edit</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-brand-dark border border-brand-gray p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{editingProduct.id ? 'Edit Product' : 'Create Product'}</h2>
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Name</label>
                    <input className="w-full bg-brand-black border border-brand-gray p-2" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} required />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <select className="w-full bg-brand-black border border-brand-gray p-2" value={editingProduct.category || 'Unisex'} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Price</label>
                    <input type="number" className="w-full bg-brand-black border border-brand-gray p-2" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea className="w-full bg-brand-black border border-brand-gray p-2 h-24" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
                </div>
                 <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={editingProduct.isBestSeller || false} onChange={e => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})} />
                        Best Seller
                    </label>
                     <label className="flex items-center gap-2">
                        <input type="checkbox" checked={editingProduct.isActive !== false} onChange={e => setEditingProduct({...editingProduct, isActive: e.target.checked})} />
                        Active
                    </label>
                </div>
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-gold text-black font-bold">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;