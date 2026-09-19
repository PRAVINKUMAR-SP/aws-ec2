import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';

const Orders = () => {
    const navigate = useNavigate();
    const { orders } = useCart();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            <Navbar />
            
            <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <button 
                        onClick={() => navigate('/main')}
                        className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                    >
                        Continue Shopping
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
                        <button 
                            onClick={() => navigate('/main')}
                            className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-md hover:bg-emerald-600 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Placed</p>
                                            <p className="text-gray-900 font-medium">{formatDate(order.date)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                            <p className="text-gray-900 font-medium">₹{order.totalAmount.toFixed(0)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order #</p>
                                        <p className="font-mono text-gray-900 font-medium">{order.id}</p>
                                    </div>
                                </div>
                                
                                {/* Order Body */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        <span className="font-bold text-emerald-600 text-lg">{order.status}</span>
                                        <span className="text-gray-500 ml-2">Arriving Soon</span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={`${item.id}-${index}`} className="flex gap-6 items-center">
                                                <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 p-2 flex items-center justify-center">
                                                    <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-gray-900 text-lg hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                                                    <p className="text-gray-500 text-sm">{item.category}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900 text-lg">₹{item.price}</p>
                                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Orders;
