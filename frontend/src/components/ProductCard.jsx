import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group relative cursor-pointer"
        >
            
            {/* Dynamic Sale Badge */}
            {product.price < 100 && (
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-sm z-10 shadow-sm">
                    SALE
                </div>
            )}

            {/* Image Container */}
            <div className="relative w-full h-36 md:h-56 overflow-hidden bg-white flex items-center justify-center p-3 md:p-6">
                {product.imageUrl ? (
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80';
                        }}
                    />
                ) : (
                    <img 
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80" 
                        alt="Placeholder"
                        className="w-full h-full object-contain mix-blend-multiply opacity-60 group-hover:scale-110 transition-transform duration-500"
                    />
                )}
            </div>
            
            {/* Content Container */}
            <div className="p-3 md:p-5 flex flex-col flex-grow bg-white border-t border-gray-50">
                <h3 className="font-extrabold text-sm md:text-lg text-gray-900 mb-0.5 md:mb-1 line-clamp-1">{product.title}</h3>
                
                {/* Simulated Product Rating */}
                <div className="flex items-center gap-0.5 md:gap-1 mb-1.5 md:mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-3 h-3 md:w-4 md:h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-[10px] md:text-xs text-gray-400 ml-0.5 md:ml-1 font-medium">(128)</span>
                </div>

                <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 leading-relaxed flex-grow hidden md:block">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs text-gray-400 line-through font-semibold">₹{(product.price * 1.25).toFixed(0)}</span>
                        <span className="text-lg md:text-2xl font-extrabold text-gray-900">₹{product.price.toFixed(0)}</span>
                    </div>
                    <button 
                        className="bg-accent text-white px-2.5 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105 flex items-center gap-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                        title="Add to Cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="hidden md:inline">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
