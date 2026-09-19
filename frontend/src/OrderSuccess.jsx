import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTitle from './components/PageTitle';
import { useCart } from './context/CartContext';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart when landing on success page
        clearCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const orderId = location.state?.orderId || ("ORD-" + Math.floor(Math.random() * 100000000));

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
            <PageTitle title="Order Success | A2Z~cart" />
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-lg w-full text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-500 mb-8 text-lg">Thank you for shopping at A2Z~cart.</p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Order Number</p>
                        <p className="font-mono font-bold text-gray-800 text-lg">{orderId}</p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                            <p className="font-bold text-emerald-600">By Tomorrow, 9 PM</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/main')}
                        className="w-full px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all text-lg"
                    >
                        CONTINUE SHOPPING
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
