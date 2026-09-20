import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import PageTitle from './components/PageTitle';

const CATEGORIES = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Toys & Games',
    'Books',
    'Other'
];

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: CATEGORIES[0],
        imageUrl: '',
        galleryImages: [],
        rating: 5.0,
        reviewCount: 0,
        stockQuantity: 0,
        highlights: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail !== 'pravin007ptk@gmail') {
            navigate('/main');
        } else if (id) {
            axios.get(`/api/products/${id}`)
                .then(res => {
                    const data = res.data;
                    setProduct({
                        ...data,
                        highlights: data.highlights ? data.highlights.join('\n') : '',
                        galleryImages: data.galleryImages || []
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id, navigate]);

    const handleImageUpload = (e, isMain, index = 0) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit per image to be safe
                alert("File is too large. Please select an image under 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                if (isMain) {
                    setProduct(prev => ({ ...prev, imageUrl: base64String }));
                } else {
                    setProduct(prev => {
                        const newGallery = [...prev.galleryImages];
                        newGallery[index] = base64String;
                        return { ...prev, galleryImages: newGallery };
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Prepare payload
            const payload = {
                ...product,
                highlights: product.highlights 
                    ? product.highlights.split('\n').map(h => h.trim()).filter(h => h.length > 0)
                    : [],
                galleryImages: product.galleryImages.filter(img => img !== undefined && img !== null && img !== '')
            };

            if (id) {
                await axios.put(`/api/products/${id}`, payload);
            } else {
                await axios.post(`/api/products`, payload);
            }
            navigate('/admin');
        } catch (err) {
            console.error(err);
            const serverMsg = err.response && err.response.data ? err.response.data : err.message;
            alert("Failed to save product. Backend says:\n\n" + (typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg)));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-page font-sans">
            <PageTitle title={id ? "Edit Product | Admin" : "Add Product | Admin"} />
            <Navbar />
            
            <div className="max-w-4xl mx-auto p-4 md:p-10 w-full mt-4 md:mt-10">
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl mb-8 text-gray-900 font-bold border-b pb-4">{id ? 'Edit Product' : 'Add New Product'}</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Product Title</label>
                                <input 
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm" 
                                    type="text" 
                                    value={product.title} 
                                    onChange={e => setProduct({...product, title: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Category</label>
                                <select 
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                                    value={product.category}
                                    onChange={e => setProduct({...product, category: e.target.value})}
                                    required
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Price (₹)</label>
                                <input 
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm" 
                                    type="number" 
                                    step="0.01" 
                                    value={product.price} 
                                    onChange={e => setProduct({...product, price: parseFloat(e.target.value)})} 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-700">Stock Quantity</label>
                                <input 
                                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm" 
                                    type="number" 
                                    min="0"
                                    value={product.stockQuantity} 
                                    onChange={e => setProduct({...product, stockQuantity: parseInt(e.target.value, 10)})} 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">Description</label>
                            <textarea 
                                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm min-h-[100px]" 
                                value={product.description} 
                                onChange={e => setProduct({...product, description: e.target.value})} 
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">Product Highlights (One per line)</label>
                            <textarea 
                                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm min-h-[120px]" 
                                value={product.highlights}
                                placeholder="e.g.&#10;100% Cotton&#10;Machine Washable&#10;Made in India"
                                onChange={e => setProduct({...product, highlights: e.target.value})} 
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Product Images (Upload)</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-700">Main Image <span className="text-red-500">*</span></label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, true)}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all"
                                        required={!id && !product.imageUrl} // required for new product if no image
                                    />
                                    {product.imageUrl && <div className="mt-2"><img src={product.imageUrl} alt="Main" className="h-20 w-20 object-cover rounded shadow" /></div>}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-gray-700">Sub Image 1 (Optional)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, false, 0)}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                                        />
                                        {product.galleryImages[0] && <div className="mt-2"><img src={product.galleryImages[0]} alt="Sub 1" className="h-16 w-16 object-cover rounded shadow" /></div>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-gray-700">Sub Image 2 (Optional)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, false, 1)}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                                        />
                                        {product.galleryImages[1] && <div className="mt-2"><img src={product.galleryImages[1]} alt="Sub 2" className="h-16 w-16 object-cover rounded shadow" /></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 mt-8 pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`flex-1 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1'}`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Product'}
                            </button>
                            <button 
                                type="button" 
                                className="flex-1 py-4 rounded-xl bg-gray-200 text-gray-800 font-bold text-lg shadow hover:bg-gray-300 transition-all" 
                                onClick={() => navigate('/admin')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
