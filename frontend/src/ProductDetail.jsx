import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedQty, setSelectedQty] = useState(1);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setActiveImage(data.imageUrl);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-page text-gray-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-10">
                    {/* Skeleton Loader */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px', minHeight: '600px' }} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
                            <div className="w-64 h-64 rounded-2xl animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                        </div>
                        <div className="p-10 space-y-4">
                            <div className="w-20 h-6 rounded-full animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            <div className="w-3/4 h-8 rounded-lg animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            <div className="w-1/4 h-6 rounded-lg animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            <div className="w-1/2 h-10 rounded-lg animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            <div className="w-full h-20 rounded-lg animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            <div className="flex gap-4 pt-6">
                                <div className="flex-1 h-14 rounded-xl animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                                <div className="flex-1 h-14 rounded-xl animate-pulse" style={{ backgroundColor: '#e5e7eb' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-page text-gray-900">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-96">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/main')} className="bg-accent text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors shadow-lg font-bold text-sm">
                        ← Back to Store
                    </button>
                </div>
            </div>
        );
    }

    const discountedPrice = (product.price * 1.25).toFixed(0);
    const rating = product.rating || (Math.random() * 1.5 + 3.5).toFixed(1);
    const reviewCount = product.reviewCount || Math.floor(Math.random() * 5000) + 100;
    const discount = 20;

    // Use real gallery images from dataset if available, otherwise fallback
    const galleryImages = product.galleryImages && product.galleryImages.length > 0
        ? product.galleryImages
        : [
            product.imageUrl,
            'https://images.unsplash.com/photo-1601784551446-20c9e07cd56e?w=800&h=800&fit=crop&q=80',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80'
        ];

    return (
        <div className="min-h-screen text-gray-900" style={{ backgroundColor: '#f1f3f6' }}>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                {/* Breadcrumb */}
                <nav className="flex items-center text-xs text-gray-400 mb-5 font-medium">
                    <button onClick={() => navigate('/main')} className="hover:text-accent transition-colors flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Home
                    </button>
                    <span className="mx-2">›</span>
                    <span className="hover:text-accent cursor-pointer transition-colors">{product.category}</span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-600 font-semibold truncate max-w-xs">{product.title}</span>
                </nav>

                {/* Product Card */}
                <div
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col lg:grid lg:grid-cols-2"
                    style={{ minHeight: '580px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                >
                    {/* LEFT: Image Section (Sticky) */}
                    <div className="relative bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
                        <div className="lg:sticky lg:top-0 p-5 lg:p-8 flex flex-col items-center h-full lg:min-h-[580px]">
                            {/* Sale Badge */}
                            {product.price < 500 && (
                                <div
                                    className="absolute top-6 left-6 text-white text-xs font-bold px-3 py-1.5 rounded-md z-10"
                                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 2px 8px rgba(239,68,68,0.4)' }}
                                >
                                    🔥 DEAL OF THE DAY
                                </div>
                            )}

                            {/* Main Image Viewport */}
                            <div className="flex justify-center w-full mb-8 relative group pt-4">
                                <img
                                    src={activeImage}
                                    alt={product.title}
                                    onLoad={() => setImgLoaded(true)}
                                    className="transition-all duration-300"
                                    style={{
                                        maxWidth: '420px',
                                        maxHeight: '420px',
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        opacity: imgLoaded ? 1 : 0,
                                        transform: imgLoaded ? 'scale(1)' : 'scale(0.95)'
                                    }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80'; }}
                                />

                                {/* Hover Zoom indicator */}
                                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                </div>
                            </div>

                            {/* Sub Images Gallery */}
                            <div className="flex justify-center gap-4 w-full pb-4">
                                {galleryImages.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => { setImgLoaded(false); setActiveImage(imgUrl); }}
                                        className="w-24 h-24 rounded-lg flex items-center justify-center p-2 cursor-pointer bg-white transition-all duration-200"
                                        style={{
                                            border: activeImage === imgUrl ? '2px solid #2563eb' : '1px solid #e5e7eb',
                                            boxShadow: activeImage === imgUrl ? '0 0 0 1px rgba(37, 99, 235, 0.2)' : 'none'
                                        }}
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => { e.target.onerror = null; e.target.src = product.imageUrl; }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="p-5 lg:p-10 overflow-y-auto">
                        {/* Title Header */}
                        <div className="mb-6">
                            {/* Category & Stock Status */}
                            <div className="mb-3 flex justify-between items-center">
                                <span
                                    className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
                                    style={{ backgroundColor: '#eff6ff', color: '#2563eb', display: 'inline-block' }}
                                >
                                    {product.category}
                                </span>
                                {product.stockQuantity !== undefined && (
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${product.stockQuantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stockQuantity > 0 ? (product.stockQuantity < 5 ? `Only ${product.stockQuantity} left!` : 'In Stock') : 'Out of Stock'}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>

                            {/* Rating & Assured Badge */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="flex items-center text-xs font-bold px-2 py-0.5 rounded shadow-sm gap-1"
                                        style={{ backgroundColor: '#16a34a', color: '#fff' }}
                                    >
                                        {rating}
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 text-sm font-medium">{reviewCount.toLocaleString()} Ratings</span>
                                </div>

                                <div className="flex items-center gap-1.5 ml-4">
                                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded tracking-wider shadow-sm" style={{ backgroundColor: '#1e3a8a', color: '#10b981' }}>A2Z</span>
                                    <span className="text-sm text-gray-900 font-bold">Assured</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="flex flex-col items-start mb-8 w-full">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">₹{product.price.toFixed(0)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-base text-gray-400 line-through font-medium">₹{discountedPrice}</span>
                                <span className="font-bold text-sm px-2 py-0.5 rounded-full" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>{discount}% off</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 0 24px 0' }}></div>

                        {/* EMI & Offers */}
                        <div className="mb-5 space-y-2">
                            <div className="flex items-start gap-3 text-sm">
                                <span className="font-bold text-gray-500 w-20 flex-shrink-0">Offers</span>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                                        <span className="text-gray-700">Bank Offer: <strong>10% off on SBI Credit Card</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                                        <span className="text-gray-700">No Cost EMI starting <strong>₹{Math.ceil(product.price / 6)}/month</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 0 16px 0' }}></div>

                        {/* Delivery */}
                        <div className="flex items-start gap-3 text-sm mb-5">
                            <span className="font-bold text-gray-500 w-20 flex-shrink-0">Delivery</span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <span className="text-gray-700">Free delivery by <strong style={{ color: '#16a34a' }}>Tomorrow</strong></span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3 text-sm mb-5">
                            <span className="font-bold text-gray-500 w-20 flex-shrink-0">Quantity</span>
                            <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid #d1d5db' }}>
                                <button
                                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                                    className="w-9 h-9 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                >−</button>
                                <span className="w-10 h-9 flex items-center justify-center text-sm font-bold text-gray-900" style={{ borderLeft: '1px solid #d1d5db', borderRight: '1px solid #d1d5db' }}>
                                    {selectedQty}
                                </span>
                                <button
                                    onClick={() => setSelectedQty(Math.min(product.stockQuantity !== undefined ? product.stockQuantity : 10, selectedQty + 1))}
                                    className="w-9 h-9 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                >+</button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0 0 16px 0' }}></div>

                        {/* Description */}
                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Product Description</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Highlights</h3>
                            <div className="space-y-2">
                                {(product.highlights && product.highlights.length > 0 ? product.highlights : [
                                    'In Stock & Ready to Ship',
                                    'Free Delivery on orders over ₹499',
                                    '30-Day Money-Back Guarantee',
                                    'Genuine Product | Authorized Seller'
                                ]).map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#6b7280' }}></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="rounded-xl p-4" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Sold by</p>
                                    <p className="text-sm font-bold" style={{ color: '#2563eb' }}>A2Z~cart Official Store</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: '#16a34a', color: '#fff' }}>
                                        4.8
                                        <svg className="w-2.5 h-2.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
                            <button
                                onClick={() => {
                                    addToCart(product, selectedQty);
                                }}
                                disabled={product.stockQuantity === 0}
                                className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${product.stockQuantity === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : ''}`}
                                style={{ backgroundColor: product.stockQuantity === 0 ? '' : '#ff9f00', color: product.stockQuantity === 0 ? '' : '#ffffff' }}
                                onMouseEnter={(e) => product.stockQuantity !== 0 && (e.currentTarget.style.backgroundColor = '#e68a00')}
                                onMouseLeave={(e) => product.stockQuantity !== 0 && (e.currentTarget.style.backgroundColor = '#ff9f00')}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {product.stockQuantity === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(product, selectedQty);
                                    navigate('/cart');
                                }}
                                disabled={product.stockQuantity === 0}
                                className={`flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${product.stockQuantity === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : ''}`}
                                style={{ backgroundColor: product.stockQuantity === 0 ? '' : '#fb641b', color: product.stockQuantity === 0 ? '' : '#ffffff' }}
                                onMouseEnter={(e) => product.stockQuantity !== 0 && (e.currentTarget.style.backgroundColor = '#e55b18')}
                                onMouseLeave={(e) => product.stockQuantity !== 0 && (e.currentTarget.style.backgroundColor = '#fb641b')}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
