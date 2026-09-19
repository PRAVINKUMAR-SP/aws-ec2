import React, { useState, useEffect } from 'react';

const slides = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1550009158-9effb6623347?q=80&w=2200&auto=format&fit=crop',
        tagline: 'A2Z~cart Exclusives',
        title: 'The Future of Tech',
        subtitle: 'Experience next-gen electronics with up to 50% off premium brands.'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2200&auto=format&fit=crop',
        tagline: 'A2Z~cart Style Week',
        title: 'Elevate Your Wardrobe',
        subtitle: 'Discover the latest global fashion trends curated just for you.'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2200&auto=format&fit=crop',
        tagline: 'A2Z~cart Home',
        title: 'Premium Living Spaces',
        subtitle: 'Transform your home with our exclusive luxury decor collection.'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2200&auto=format&fit=crop',
        tagline: 'A2Z~cart Beauty',
        title: 'Flawless Essentials',
        subtitle: 'Glow up with 100% authentic top-tier beauty and skincare products.'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2200&auto=format&fit=crop',
        tagline: 'A2Z~cart Active',
        title: 'Push Your Limits',
        subtitle: 'Professional sports equipment and fitness gear now on mega sale.'
    }
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <div className="max-w-[2200px] h-[420px] w-full mx-auto py-6 px-4 relative group">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-sm bg-center bg-cover duration-500 relative overflow-hidden shadow-card"
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10"></div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-start p-16 max-w-2xl">
                    <span className="text-emerald-400 font-extrabold tracking-widest uppercase text-sm mb-3 drop-shadow-md">
                        {slides[currentIndex].tagline}
                    </span>
                    <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-md leading-tight tracking-tight">
                        {slides[currentIndex].title}
                    </h2>
                    <p className="text-xl text-gray-200 font-medium drop-shadow-sm mb-8">
                        {slides[currentIndex].subtitle}
                    </p>
                    <button className="bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-sm font-bold text-lg shadow-md transition-colors flex items-center gap-2">
                        Shop Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Left Arrow */}
            <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] left-12 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/60 transition-colors items-center justify-center backdrop-blur-sm shadow-md" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>

            {/* Right Arrow */}
            <div className="hidden group-hover:flex absolute top-[50%] -translate-x-0 translate-y-[-50%] right-12 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/60 transition-colors items-center justify-center backdrop-blur-sm shadow-md" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Dots */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center py-2 gap-3">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`cursor-pointer h-2.5 rounded-full transition-all duration-300 shadow-sm ${slideIndex === currentIndex ? 'bg-accent w-8' : 'bg-white/60 hover:bg-white w-2.5'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
