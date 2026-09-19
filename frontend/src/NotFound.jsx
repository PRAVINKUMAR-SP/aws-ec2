import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageTitle from './components/PageTitle';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-page flex flex-col">
            <PageTitle title="Page Not Found | A2Z~cart" />
            <Navbar />
            
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-lg">
                    <h1 className="text-9xl font-extrabold text-indigo-900 tracking-tighter mb-4 drop-shadow-md">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Oops! Page not found.
                    </h2>
                    <p className="text-gray-500 mb-10 text-lg">
                        The page you're looking for doesn't exist or has been moved. Let's get you back to shopping.
                    </p>
                    
                    <button 
                        onClick={() => navigate('/main')}
                        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
