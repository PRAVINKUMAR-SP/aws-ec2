import React, { useState, useEffect } from 'react';

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        addressLine: '',
        city: '',
        pincode: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                        required 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-white" 
                        placeholder="John Doe" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-white" 
                        placeholder="+91 9876543210" 
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (Area and Street)</label>
                <textarea 
                    required 
                    rows="3" 
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-white" 
                    placeholder="123 Main St, Apartment 4B"
                ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City/District/Town</label>
                    <input 
                        required 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-white" 
                        placeholder="Mumbai" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input 
                        required 
                        type="text" 
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 px-4 py-2 border bg-white" 
                        placeholder="400001" 
                    />
                </div>
            </div>
            <div className="pt-4 flex gap-3">
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors"
                >
                    Save Address
                </button>
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="px-6 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default AddressForm;
