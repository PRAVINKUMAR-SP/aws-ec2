import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-indigo-950 text-gray-300 py-12 mt-auto border-t border-indigo-900">
            <div className="max-w-[1500px] mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="text-3xl font-extrabold tracking-tight italic flex items-center">
                            <span className="text-emerald-400">A2Z</span>
                            <span className="text-white">~cart</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your one-stop destination for premium products. Experience seamless shopping, fast delivery, and top-tier customer service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/main" className="hover:text-emerald-400 transition-colors">Home</a></li>
                            <li><a href="/profile" className="hover:text-emerald-400 transition-colors">My Account</a></li>
                            <li><a href="/orders" className="hover:text-emerald-400 transition-colors">Order History</a></li>
                            <li><a href="/cart" className="hover:text-emerald-400 transition-colors">Shopping Cart</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Stay Connected</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full px-4 py-2 rounded-l-md bg-indigo-900 border-none text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                            />
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-md font-bold transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} A2Z~cart. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
