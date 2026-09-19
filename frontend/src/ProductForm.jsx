import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        rating: 5.0,
        reviewCount: 0
    });

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail !== 'pravin007ptk@gmail') {
            navigate('/main');
        } else if (id) {
            axios.get(`http://${window.location.hostname}:8080/api/products/${id}`)
                .then(res => setProduct(res.data))
                .catch(err => console.error(err));
        }
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://${window.location.hostname}:8080/api/products/${id}`, product);
            } else {
                await axios.post(`http://${window.location.hostname}:8080/api/products`, product);
            }
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert("Failed to save product.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-page">
            <Navbar />
            <div className="max-w-2xl mx-auto p-10 w-full mt-10">
                <div className="bg-white p-10 rounded-sm shadow-sm border border-gray-200">
                    <h2 className="text-2xl mb-6 text-gray-900 font-medium">{id ? 'Edit Product' : 'Add New Product'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input className="w-full p-3 rounded-sm border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:outline-none transition-colors shadow-sm" type="text" value={product.title} onChange={e => setProduct({...product, title: e.target.value})} required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <input className="w-full p-3 rounded-sm border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:outline-none transition-colors shadow-sm" type="text" value={product.category} onChange={e => setProduct({...product, category: e.target.value})} required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input className="w-full p-3 rounded-sm border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:outline-none transition-colors shadow-sm" type="number" step="0.01" value={product.price} onChange={e => setProduct({...product, price: parseFloat(e.target.value)})} required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
                            <input className="w-full p-3 rounded-sm border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:outline-none transition-colors shadow-sm" type="text" value={product.imageUrl} onChange={e => setProduct({...product, imageUrl: e.target.value})} required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <input className="w-full p-3 rounded-sm border border-gray-300 bg-white text-gray-900 text-sm focus:border-brand focus:outline-none transition-colors shadow-sm" type="text" value={product.description} onChange={e => setProduct({...product, description: e.target.value})} />
                        </div>
                        
                        <div className="flex gap-4 mt-8">
                            <button type="submit" className="flex-1 p-3.5 rounded-sm bg-accent text-white font-medium shadow-sm hover:bg-accent-dark transition-colors">Save Product</button>
                            <button type="button" className="flex-1 p-3.5 rounded-sm bg-gray-500 text-white font-medium shadow-sm hover:bg-gray-600 transition-colors" onClick={() => navigate('/admin')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
