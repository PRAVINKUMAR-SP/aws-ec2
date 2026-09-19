import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddressForm from './components/AddressForm';
import { useCart } from './context/CartContext';

const Profile = () => {
    // In a real app, this would come from a UserContext or API
    const userEmail = localStorage.getItem('userEmail') || "user@example.com";
    
    const { addresses, addAddress, updateAddress, deleteAddress } = useCart();
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const handleSaveNewAddress = (formData) => {
        addAddress(formData);
        setShowAddForm(false);
    };

    const handleUpdateAddress = (formData) => {
        updateAddress(editingAddressId, formData);
        setEditingAddressId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            <Navbar />
            
            <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">My Profile</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left sidebar / avatar */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center text-5xl font-bold mb-4 shadow-inner">
                                {userEmail.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 truncate" title={userEmail}>
                                {userEmail.split('@')[0]}
                            </h2>
                            <p className="text-gray-500 text-sm truncate" title={userEmail}>{userEmail}</p>
                        </div>
                    </div>
                    
                    {/* Right content / details */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Personal Information Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Personal Information</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-gray-50" defaultValue="User" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-gray-50" defaultValue="Account" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" disabled className="w-full border-gray-200 rounded-lg shadow-sm bg-gray-100 px-4 py-2 border text-gray-500 cursor-not-allowed" value={userEmail} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <input type="tel" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-gray-50" placeholder="Add mobile number" />
                                </div>
                                <div className="pt-2">
                                    <button type="button" className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        {/* Manage Addresses Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Manage Addresses</h3>
                                {!showAddForm && !editingAddressId && (
                                    <button 
                                        onClick={() => setShowAddForm(true)}
                                        className="text-emerald-600 hover:text-emerald-700 font-bold text-sm hover:underline"
                                    >
                                        + ADD NEW ADDRESS
                                    </button>
                                )}
                            </div>
                            
                            <div className="space-y-4">
                                {showAddForm ? (
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-4">Add a new address</h4>
                                        <AddressForm onSubmit={handleSaveNewAddress} onCancel={() => setShowAddForm(false)} />
                                    </div>
                                ) : editingAddressId ? (
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h4 className="font-bold text-gray-800 mb-4">Edit address</h4>
                                        <AddressForm 
                                            initialData={addresses.find(a => a.id === editingAddressId)}
                                            onSubmit={handleUpdateAddress} 
                                            onCancel={() => setEditingAddressId(null)} 
                                        />
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>You haven't saved any addresses yet.</p>
                                    </div>
                                ) : (
                                    addresses.map(address => (
                                        <div key={address.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="font-bold text-gray-900 mr-4">{address.fullName}</span>
                                                    <span className="font-bold text-gray-700">{address.phone}</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button 
                                                        onClick={() => setEditingAddressId(address.id)}
                                                        className="text-emerald-600 font-bold text-sm hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteAddress(address.id)}
                                                        className="text-red-500 font-bold text-sm hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-gray-600 mt-2 text-sm leading-relaxed">
                                                {address.addressLine}, {address.city}, {address.pincode}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
