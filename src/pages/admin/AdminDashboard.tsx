import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../../api/axios';
import { Plus, Edit, Trash, Upload, X } from 'lucide-react';

export function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    sale_price: '',
    featured: false,
    sizes: '[{"size":37,"quantity":10}]'
  });
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (user) {
      // Check admin status via backend
      api.get('/admin/check').then(res => {
        setIsAdmin(res.data.isAdmin);
        if (res.data.isAdmin) {
          fetchProducts();
        }
      }).catch(() => setIsAdmin(false));
    } else if (!loading) {
      setIsAdmin(false);
    }
  }, [user, loading]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.products || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, typeof val === 'boolean' ? val.toString() : val);
    });
    if (images) {
      Array.from(images).forEach(img => {
        data.append('images', img);
      });
    }

    try {
      await api.post('/admin/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowAddForm(false);
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this product?')) {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    }
  };

  if (loading || isAdmin === null) return <div className="p-20 text-center">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-black text-white px-4 py-2 flex items-center gap-2"
        >
          {showAddForm ? <X size={20} /> : <Plus size={20} />}
          {showAddForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-gray-50 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input required type="text" className="w-full border p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input required type="text" className="w-full border p-2" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Description</label>
            <textarea required className="w-full border p-2" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm mb-1">Category (heels, flats, boots, sandals)</label>
            <input required type="text" className="w-full border p-2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm mb-1">Brand</label>
            <input required type="text" className="w-full border p-2" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm mb-1">Price (₹)</label>
            <input required type="number" className="w-full border p-2" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm mb-1">Sale Price (Optional)</label>
            <input type="number" className="w-full border p-2" value={formData.sale_price} onChange={e => setFormData({...formData, sale_price: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Sizes & Quantities (JSON format: [{`{"size":37,"quantity":10}`}] )</label>
            <input required type="text" className="w-full border p-2" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Images (Multiple)</label>
            <input type="file" multiple accept="image/*" onChange={e => setImages(e.target.files)} className="w-full border p-2 bg-white" />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
              <span>Featured Product</span>
            </label>
          </div>
          <div className="md:col-span-2 mt-4">
            <button type="submit" className="bg-black text-white px-8 py-3 w-full hover:bg-gray-800">
              Save Product
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-gray-100">
                <td className="p-4">
                  <img src={p.image.startsWith('http') ? p.image : `http://localhost:3000${p.image}`} alt={p.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">
                  {p.stock && p.stock.map((s: any) => (
                    <div key={s.size} className="text-xs">Size {s.size}: {s.quantity} {s.quantity === 0 ? '(Out of Stock)' : s.quantity <= 5 ? '(Only few left)' : ''}</div>
                  ))}
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
