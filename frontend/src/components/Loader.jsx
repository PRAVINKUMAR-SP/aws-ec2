import React from 'react';

const Loader = ({ size = 'md', message = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-12 h-12 border-4',
        lg: 'w-16 h-16 border-4'
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 w-full">
            <div className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-emerald-500 animate-spin mb-4`}></div>
            {message && <p className="text-gray-500 font-medium animate-pulse">{message}</p>}
        </div>
    );
};

export default Loader;
