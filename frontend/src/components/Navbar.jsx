import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch, onReset }) => {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'ADMIN';

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const handleLogoClick = () => {
        setSearchQuery('');
        if (onReset) {
            onReset();
        } else {
            navigate('/main');
        }
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                const filtered = response.data.filter(product => 
                    (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
                    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
                );
                setSearchResults(filtered);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        const debounceTimer = setTimeout(fetchSearchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    const handleResultClick = (id) => {
        setIsSearchFocused(false);
        setSearchQuery('');
        if (onSearch) onSearch('');
        navigate(`/product/${id}`);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-900 to-indigo-950 px-16 py-5 flex justify-between items-center sticky top-0 z-50 shadow-md border-b border-indigo-900">
            <div className="text-3xl font-extrabold cursor-pointer tracking-tight italic flex items-center" onClick={handleLogoClick}>
                <span className="text-emerald-400 drop-shadow-md">A2Z</span>
                <span className="text-white drop-shadow-md">~cart</span>
            </div>
            
            <div className="flex-grow max-w-3xl mx-12 relative group" ref={searchRef}>
                <input 
                    className="w-full pl-12 pr-6 py-2.5 rounded-full border-0 text-base shadow-inner bg-white/95 text-gray-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all duration-300"
                    type="text" 
                    placeholder="Search for premium products, brands and more..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                {/* Search Dropdown */}
                {isSearchFocused && searchQuery.trim() !== '' && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                        {searchResults.length > 0 ? (
                            <div className="py-2">
                                <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Products</h3>
                                {searchResults.map(product => (
                                    <div 
                                        key={product.id}
                                        onClick={() => handleResultClick(product.id)}
                                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        <div className="w-12 h-12 flex-shrink-0 bg-white border border-gray-100 rounded flex items-center justify-center p-1">
                                            <img src={product.imageUrl} alt={product.title} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 truncate">{product.title}</h4>
                                            <p className="text-xs text-emerald-600 font-medium mt-0.5">{product.category}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>No products found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="flex gap-2 items-center">
                {isAdmin && (
                    <button className="flex items-center gap-1.5 bg-emerald-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-600 transition-colors shadow-md mr-2" onClick={() => navigate('/admin')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Admin Panel</span>
                    </button>
                )}
                <button className="flex items-center gap-2 text-white text-base font-medium px-4 py-2 rounded-md hover:bg-white/10 transition-colors" onClick={() => navigate('/cart')}>
                    <div className="relative flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2.5 -right-3 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-950 shadow-sm">
                                {getCartCount()}
                            </span>
                        )}
                    </div>
                    <span className="ml-1">Cart</span>
                </button>
                {/* User Account Dropdown */}
                <div className="relative group ml-2">
                    <button className="flex items-center gap-2 text-white text-base font-medium px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Account</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                        <div className="py-2">
                            <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                My Profile
                            </button>
                            <button onClick={() => navigate('/orders')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Orders
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
