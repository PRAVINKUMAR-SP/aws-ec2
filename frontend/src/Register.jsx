import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            await axios.post(`http://${window.location.hostname}:8080/api/auth/register`, { name, email, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Registration failed: ' + (err.response?.data || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-page flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl relative animate-fade-in-up">
                <div className="bg-white py-0 px-0 shadow-xl rounded-2xl overflow-hidden sm:px-0 flex flex-col md:flex-row border border-gray-100">
                    
                    {/* Left Side - Image */}
                    <div className="hidden md:block md:w-1/2 relative bg-emerald-900 animate-fade-in">
                        {/* Logo (Desktop) */}
                        <div className="absolute inset-0 z-20 hidden md:flex items-center justify-center">
                            <div className="text-6xl font-extrabold tracking-tight italic flex items-center cursor-pointer transform -rotate-12 hover:-rotate-6 transition-all duration-300 animate-fade-in-up drop-shadow-2xl" onClick={() => navigate('/')}>
                                <span className="text-emerald-400">A2Z</span>
                                <span className="text-white">~cart</span>
                            </div>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1200&fit=crop&q=80" 
                            alt="Shopping Fresh" 
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-10 text-white z-10 animate-fade-in-up-delay-1">
                            <h2 className="text-3xl font-bold mb-4">Join the Family</h2>
                            <p className="text-emerald-100">Create an account to start shopping our exclusive collection of premium items today.</p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 p-10 lg:p-14 bg-white flex flex-col justify-center relative">
                        <div className="md:hidden mb-8 flex justify-center animate-fade-in">
                            <div className="text-5xl font-extrabold text-center tracking-tight italic flex justify-center items-center cursor-pointer" onClick={() => navigate('/')}>
                                <span className="text-emerald-500 drop-shadow-sm">A2Z</span>
                                <span className="text-indigo-950 drop-shadow-sm">~cart</span>
                            </div>
                        </div>

                        <div className="mb-8 mt-4 md:mt-12 animate-fade-in-up">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h2>
                            <p className="text-sm text-gray-500">Enter your details to get started with A2Z~cart.</p>
                        </div>

                        {error && <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-6 text-sm font-medium flex items-center"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>{error}</div>}
                        {success && <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-lg mb-6 text-sm font-medium flex items-center animate-fade-in"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{success}</div>}
                        
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="animate-fade-in-up-delay-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                        type="text" 
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="animate-fade-in-up-delay-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="animate-fade-in-up-delay-3">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                        type="password"
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                        placeholder="••••••••"
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters.</p>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`animate-fade-in-up-delay-3 w-full flex justify-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up-delay-3">
                            Already have an account?{' '}
                            <Link className="font-bold text-indigo-900 hover:text-indigo-800 transition-colors" to="/login">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
