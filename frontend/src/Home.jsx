import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategorySlider from './components/CategorySlider';
import ProductCard from './components/ProductCard';
import Slider from './components/Slider';
import Footer from './components/Footer';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (searchQuery = '') => {
        try {
            setLoading(true);
            const url = searchQuery 
                ? `http://${window.location.hostname}:8080/api/products/search?q=${searchQuery}`
                : `http://${window.location.hostname}:8080/api/products`;
                
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setVisibleCount(20);
                setActiveCategory(null);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        fetchProducts(query);
    };

    const handleCategorySelect = async (categoryName) => {
        // If clicking the same category again, clear the filter
        if (activeCategory === categoryName) {
            fetchProducts();
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`http://${window.location.hostname}:8080/api/products/category/${categoryName}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setVisibleCount(20);
                setActiveCategory(categoryName);
            } else {
                setError('Failed to load category products');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    const handleViewAll = (e) => {
        e.preventDefault();
        setVisibleCount(products.length);
    };

    const handleReset = () => {
        fetchProducts(); // fetches all products
    };

    return (
        <div className="flex flex-col min-h-screen bg-page">
            <Navbar onSearch={handleSearch} onReset={handleReset} />
            <CategorySlider onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />
            
            <Slider />
            
            <main className="flex-grow">
                {error && <div className="bg-red-100 text-red-600 border border-red-300 p-3 rounded-sm m-5 text-center text-sm">{error}</div>}
                
                {loading ? (
                    <div className="text-center mt-12 text-gray-500">
                        Loading products...
                    </div>
                ) : (
                    <div className="max-w-[1500px] mx-auto px-10 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Top Products</h2>
                            {products.length > visibleCount && (
                                <a href="#" onClick={handleViewAll} className="text-accent font-semibold hover:text-accent-dark transition-colors">
                                    View All ({products.length})
                                </a>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.slice(0, visibleCount).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {products.length === 0 && !error && (
                                <div className="col-span-full text-center text-gray-500">
                                    No products found.
                                </div>
                            )}
                        </div>

                        {products.length > visibleCount && (
                            <div className="flex justify-center mt-12">
                                <button 
                                    onClick={handleShowMore}
                                    className="bg-white text-gray-800 border-2 border-gray-200 hover:border-accent hover:text-accent px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Show More Products
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default Home;
