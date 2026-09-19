import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();

    const tax = getCartTotal() * 0.05; // 5% tax
    const delivery = getCartTotal() > 500 ? 0 : 40; // Free delivery above 500
    const totalAmount = getCartTotal() + tax + delivery;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen text-gray-900 bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
                    <img 
                        src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" 
                        alt="Empty Cart" 
                        className="w-64 mb-6 opacity-90"
                    />
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">Your cart is empty!</h2>
                    <p className="text-gray-500 mb-8">Add items to it now.</p>
                    <button 
                        onClick={() => navigate('/main')}
                        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-gray-900 bg-gray-50">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-4 md:py-10">
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">Shopping Cart</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left: Cart Items */}
                    <div className="flex-1 space-y-3 md:space-y-6">
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-3 md:p-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-semibold text-sm md:text-lg text-gray-800">Cart ({getCartCount()} Items)</h2>
                                <button onClick={clearCart} className="text-xs md:text-sm font-medium text-red-500 hover:text-red-700 hover:underline">
                                    Clear Cart
                                </button>
                            </div>
                            
                            <div className="divide-y divide-gray-100">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-3 md:p-6 flex gap-3 md:gap-6">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-lg md:rounded-xl p-2 md:p-3 flex items-center justify-center cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.title}
                                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        
                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-0.5 md:mb-1 hover:text-emerald-600 cursor-pointer transition-colors line-clamp-1" onClick={() => navigate(`/product/${item.id}`)}>
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-4">{item.category}</p>
                                                </div>
                                                <div className="text-right ml-2 flex-shrink-0">
                                                    <div className="text-base md:text-xl font-bold text-gray-900">₹{item.price.toFixed(0)}</div>
                                                    <div className="text-[10px] md:text-sm text-emerald-600 font-medium">In Stock</div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-auto flex items-center gap-6">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center rounded-lg border border-gray-300">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                    >−</button>
                                                    <span className="w-10 text-center font-semibold text-sm border-x border-gray-300 h-8 flex items-center justify-center bg-gray-50">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                    >+</button>
                                                </div>
                                                
                                                {/* Remove Button */}
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-sm font-semibold text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 sticky top-28">
                            <h2 className="text-sm md:text-lg font-bold text-gray-800 mb-4 md:mb-6 uppercase tracking-wide border-b border-gray-100 pb-3 md:pb-4">Order Summary</h2>
                            
                            <div className="space-y-4 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                                <div className="flex justify-between">
                                    <span>Price ({getCartCount()} items)</span>
                                    <span className="font-medium text-gray-900">₹{getCartTotal().toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes (5%)</span>
                                    <span className="font-medium text-gray-900">₹{tax.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Delivery Charges</span>
                                    {delivery === 0 ? (
                                        <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm">Free</span>
                                    ) : (
                                        <span className="font-medium text-gray-900">₹{delivery.toFixed(0)}</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
                                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                                <span className="text-2xl font-black text-gray-900">₹{totalAmount.toFixed(0)}</span>
                            </div>
                            
                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                            
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                <span>Safe and Secure Payments. Easy returns.</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
