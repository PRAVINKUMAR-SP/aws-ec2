import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const [newProduct, setNewProduct] = useState({
        title: '', description: '', price: '', category: '', imageUrl: '', rating: 5.0, reviewCount: 0, stockQuantity: 10, highlights: [], galleryImages: []
    });
    const [highlightsText, setHighlightsText] = useState('');

    // Protection check & Data Fetching
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'ADMIN') {
            navigate('/main');
        } else {
            fetchAllData();
        }
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            const [prodRes, userRes, orderRes] = await Promise.all([
                axios.get(`/api/products`).catch(() => ({data: []})),
                axios.get(`/api/users`).catch(() => ({data: []})),
                axios.get(`/api/orders`).catch(() => ({data: []}))
            ]);
            setProducts(prodRes.data || []);
            setUsers(userRes.data || []);
            setOrders(orderRes.data || []);
        } catch (err) {
            console.error("Failed to fetch admin data", err);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error("Failed to delete", err);
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e, type) => {
        const files = Array.from(e.target.files);
        if (type === 'main' && files.length > 0) {
            const base64 = await convertToBase64(files[0]);
            setNewProduct(prev => ({ ...prev, imageUrl: base64 }));
        } else if (type === 'gallery') {
            const base64Images = await Promise.all(files.slice(0, 2).map(convertToBase64));
            setNewProduct(prev => ({ ...prev, galleryImages: base64Images }));
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const productToSave = {
                ...newProduct,
                highlights: highlightsText.split('\n').filter(h => h.trim() !== '')
            };
            await axios.post(`/api/products`, productToSave);
            alert("Product added successfully!");
            setNewProduct({ title: '', description: '', price: '', category: '', imageUrl: '', rating: 5.0, reviewCount: 0, stockQuantity: 10, highlights: [], galleryImages: [] });
            setHighlightsText('');
            fetchAllData(); // Refresh list
            setActiveTab('products');
        } catch (err) {
            console.error(err);
            alert("Failed to save product.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-indigo-950 text-white flex flex-col shadow-xl z-10">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-emerald-400 uppercase tracking-wider">Admin Portal</h2>
                    </div>
                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            Dashboard
                        </button>
                        <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            Products
                        </button>
                        <button onClick={() => setActiveTab('add_product')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'add_product' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Add Product
                        </button>
                        <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'users' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Users
                        </button>
                        <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            Orders
                        </button>
                        <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-emerald-500 text-white shadow-md' : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Settings
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-10 bg-gray-50">
                    
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                                    <div className="bg-emerald-100 p-4 rounded-full text-emerald-600"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>
                                    <div><p className="text-sm font-medium text-gray-500 uppercase">Total Products</p><p className="text-3xl font-black text-gray-900">{products.length}</p></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                                    <div className="bg-blue-100 p-4 rounded-full text-blue-600"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                                    <div><p className="text-sm font-medium text-gray-500 uppercase">Registered Users</p><p className="text-3xl font-black text-gray-900">{users.length}</p></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
                                    <div className="bg-orange-100 p-4 rounded-full text-orange-600"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg></div>
                                    <div><p className="text-sm font-medium text-gray-500 uppercase">Total Orders</p><p className="text-3xl font-black text-gray-900">{orders.length}</p></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
                                <button onClick={() => setActiveTab('add_product')} className="bg-emerald-500 text-white px-5 py-2.5 rounded shadow-sm hover:bg-emerald-600 font-medium">+ Add New Product</button>
                            </div>
                            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                                <table className="w-full border-collapse text-left text-sm text-gray-700">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                                        <tr>
                                            <th className="p-4">Image</th>
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Stock</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {products.map(product => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4"><img src={product.imageUrl} alt={product.title} className="w-12 h-12 object-cover rounded border border-gray-200" /></td>
                                                <td className="p-4 font-bold text-gray-900">{product.title}</td>
                                                <td className="p-4">{product.category}</td>
                                                <td className="p-4 font-bold text-emerald-600">₹{product.price}</td>
                                                <td className="p-4 font-medium text-gray-700">
                                                    {product.stockQuantity !== undefined ? (
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${product.stockQuantity === 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}>
                                                            {product.stockQuantity}
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <button onClick={() => navigate(`/admin/edit/${product.id}`)} className="text-blue-600 font-bold mr-4 hover:underline">Edit</button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 font-bold hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length === 0 && (
                                            <tr><td colSpan="6" className="p-8 text-center text-gray-500">No products found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Add Product Tab */}
                    {activeTab === 'add_product' && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
                                <form onSubmit={handleAddProduct} className="space-y-5">
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Product Title</label>
                                        <input type="text" className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} required />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Category</label>
                                        <select className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required>
                                            <option value="" disabled>Select a category</option>
                                            <option value="Mobiles">Mobiles</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Home">Home</option>
                                            <option value="Appliances">Appliances</option>
                                            <option value="Toys">Toys</option>
                                            <option value="Beauty">Beauty</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Books">Books</option>
                                            <option value="Groceries">Groceries</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Price (₹)</label>
                                        <input type="number" className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} required />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Stock Quantity</label>
                                        <input type="number" className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" value={newProduct.stockQuantity} onChange={e => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value) || 0})} required />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Highlights (one per line)</label>
                                        <textarea className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none h-24" value={highlightsText} onChange={e => setHighlightsText(e.target.value)} placeholder="e.g. Free Delivery\n1 Year Warranty" />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Main Image</label>
                                        <input type="file" accept="image/*" className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 outline-none" onChange={e => handleImageUpload(e, 'main')} required />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Sub Images (up to 2)</label>
                                        <input type="file" accept="image/*" multiple className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 outline-none" onChange={e => handleImageUpload(e, 'gallery')} />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Description</label>
                                        <textarea className="w-full p-3 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none h-24" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                                    </div>
                                    <button type="submit" className="w-full p-3.5 bg-emerald-500 text-white font-bold rounded shadow hover:bg-emerald-600 transition-colors">Publish Product</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Registered Users</h1>
                            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                                <table className="w-full border-collapse text-left text-sm text-gray-700">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                                        <tr>
                                            <th className="p-4">ID</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map(user => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 text-gray-500">#{user.id}</td>
                                                <td className="p-4 font-bold text-gray-900">{user.name || '-'}</td>
                                                <td className="p-4">{user.email}</td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr><td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Global Orders</h1>
                            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                                <table className="w-full border-collapse text-left text-sm text-gray-700">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-medium">
                                        <tr>
                                            <th className="p-4">Order ID</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Amount</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-900">#{order.id}</td>
                                                <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td className="p-4 text-gray-600">{order.userEmail}</td>
                                                <td className="p-4 font-bold text-emerald-600">₹{order.totalAmount}</td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr><td colSpan="5" className="p-8 text-center text-gray-500">No orders found in the database.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Settings</h1>
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-3xl">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">General Settings</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Store Name</label>
                                        <input type="text" className="w-full p-3 rounded border border-gray-300 bg-gray-50" value="A2Z~cart" disabled />
                                    </div>
                                    <div>
                                        <label className="block mb-1.5 text-sm font-bold text-gray-700">Support Email</label>
                                        <input type="email" className="w-full p-3 rounded border border-gray-300 bg-gray-50" value="support@a2zcart.com" disabled />
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded shadow hover:bg-indigo-700 transition-colors">Save Settings</button>
                                        <p className="mt-2 text-xs text-gray-500">Settings are currently read-only in this demo version.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
