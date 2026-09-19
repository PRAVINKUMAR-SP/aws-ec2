import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddressForm from './components/AddressForm';
import { useCart } from './context/CartContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { getCartTotal, getCartCount, cart, placeOrder, addresses, addAddress, updateAddress } = useCart();
    const [loading, setLoading] = useState(false);
    
    // UI State for Addresses
    const [selectedAddressId, setSelectedAddressId] = useState(addresses.length > 0 ? addresses[0].id : null);
    const [showAddForm, setShowAddForm] = useState(addresses.length === 0);
    const [editingAddressId, setEditingAddressId] = useState(null);

    // If cart is empty, redirect back to cart
    if (cart.length === 0 && !loading) {
        navigate('/cart');
        return null;
    }

    const tax = getCartTotal() * 0.05;
    const delivery = getCartTotal() > 500 ? 0 : 40;
    const totalAmount = getCartTotal() + tax + delivery;

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        if (!selectedAddressId && addresses.length > 0) {
            alert("Please select a delivery address.");
            return;
        }

        const selectedAddress = addresses.find(a => a.id === selectedAddressId);
        if (!selectedAddress && !showAddForm) {
            alert("Please provide a delivery address.");
            return;
        }

        setLoading(true);
        const orderId = "ORD-" + Math.floor(Math.random() * 100000000);
        
        // Simulate network delay
        setTimeout(() => {
            placeOrder(cart, totalAmount, orderId, selectedAddress);
            navigate('/order-success', { state: { orderId } });
        }, 1500);
    };

    const handleSaveNewAddress = (formData) => {
        const newAddress = addAddress(formData);
        setSelectedAddressId(newAddress.id);
        setShowAddForm(false);
    };

    const handleUpdateAddress = (formData) => {
        updateAddress(editingAddressId, formData);
        setEditingAddressId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Left: Checkout Content */}
                    <div className="flex-1 space-y-6">
                            
                        {/* 1. Delivery Address Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-sm">1</span>
                                    <h2 className="font-bold text-lg text-emerald-900 uppercase">Delivery Address</h2>
                                </div>
                                {addresses.length > 0 && !showAddForm && !editingAddressId && (
                                    <button onClick={() => setShowAddForm(true)} className="text-emerald-600 font-bold text-sm hover:underline">+ ADD NEW ADDRESS</button>
                                )}
                            </div>
                            
                            <div className="p-6">
                                {showAddForm ? (
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h3 className="font-bold text-gray-800 mb-4">Add a new address</h3>
                                        <AddressForm 
                                            onSubmit={handleSaveNewAddress} 
                                            onCancel={addresses.length > 0 ? () => setShowAddForm(false) : null} 
                                        />
                                    </div>
                                ) : editingAddressId ? (
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h3 className="font-bold text-gray-800 mb-4">Edit address</h3>
                                        <AddressForm 
                                            initialData={addresses.find(a => a.id === editingAddressId)}
                                            onSubmit={handleUpdateAddress} 
                                            onCancel={() => setEditingAddressId(null)} 
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {addresses.map(address => (
                                            <div 
                                                key={address.id} 
                                                className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressId === address.id ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-gray-200 hover:border-emerald-300'}`}
                                                onClick={() => setSelectedAddressId(address.id)}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="pt-1">
                                                        <input 
                                                            type="radio" 
                                                            name="selectedAddress" 
                                                            checked={selectedAddressId === address.id}
                                                            onChange={() => setSelectedAddressId(address.id)}
                                                            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" 
                                                        />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="font-bold text-gray-900 mr-4">{address.fullName}</span>
                                                                <span className="font-bold text-gray-700">{address.phone}</span>
                                                            </div>
                                                            {selectedAddressId === address.id && (
                                                                <button onClick={(e) => { e.stopPropagation(); setEditingAddressId(address.id); }} className="text-emerald-600 text-sm font-bold hover:underline uppercase tracking-wide">
                                                                    Edit
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="text-gray-600 mt-2 text-sm leading-relaxed">
                                                            {address.addressLine}, {address.city}, {address.pincode}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {selectedAddressId === address.id && (
                                                    <div className="mt-4 ml-9">
                                                        <button className="px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-lg shadow-sm hover:bg-emerald-600 transition-colors">
                                                            DELIVER HERE
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* 2. Payment Options Section */}
                        <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${!selectedAddressId || showAddForm || editingAddressId ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-3">
                                <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-sm">2</span>
                                <h2 className="font-bold text-lg text-emerald-900 uppercase">Payment Options</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <label className="flex items-start gap-4 p-4 border border-emerald-500 rounded-xl bg-emerald-50/30 cursor-pointer transition-colors">
                                    <input type="radio" name="payment" className="mt-1 w-5 h-5 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                                    <div>
                                        <span className="block font-bold text-gray-900">Cash on Delivery (Cash/UPI)</span>
                                        <span className="block text-sm text-gray-500 mt-1">Pay at your doorstep.</span>
                                    </div>
                                </label>
                                
                                <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-not-allowed opacity-50 bg-gray-50">
                                    <input type="radio" name="payment" disabled className="mt-1 w-5 h-5" />
                                    <div>
                                        <span className="block font-bold text-gray-900">Credit / Debit / ATM Card</span>
                                        <span className="block text-sm text-gray-500 mt-1">Currently unavailable.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-28">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide border-b border-gray-100 pb-4">Order Summary</h2>
                            
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
                                <span className="text-xl font-bold text-gray-900">Total Payable</span>
                                <span className="text-2xl font-black text-gray-900">₹{totalAmount.toFixed(0)}</span>
                            </div>
                            
                            <button 
                                onClick={handlePlaceOrder}
                                disabled={loading || !selectedAddressId || showAddForm || editingAddressId}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all flex justify-center items-center gap-2 ${(loading || !selectedAddressId || showAddForm || editingAddressId) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#fb641b] text-white hover:bg-[#e55b18] hover:shadow-lg'}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        PROCESSING...
                                    </>
                                ) : (
                                    'PLACE ORDER'
                                )}
                            </button>
                        </div>
                    </div>
                    
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
