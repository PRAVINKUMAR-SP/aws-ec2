import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PageTitle from './components/PageTitle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/auth/login`, { email, password });
            if (response.data && response.data.email) {
                localStorage.setItem('userEmail', response.data.email);
            }
            if (response.data && response.data.role) {
                localStorage.setItem('userRole', response.data.role);
            }
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/main'), 1500);
        } catch (err) {
            setError('Login failed: ' + (err.response?.data || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-page flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <PageTitle title="Login | A2Z~cart" />
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl relative animate-fade-in-up">
                <div className="bg-white py-0 px-0 shadow-xl rounded-2xl overflow-hidden sm:px-0 flex flex-col md:flex-row border border-gray-100">
                    
                    {/* Left Side - Image */}
                    <div className="hidden md:block md:w-1/2 relative bg-indigo-900 animate-fade-in">
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="text-6xl font-extrabold tracking-tight italic flex items-center cursor-pointer transform -rotate-12 hover:-rotate-6 transition-all duration-300 animate-fade-in-up drop-shadow-2xl" onClick={() => navigate('/')}>
                                <span className="text-emerald-400">A2Z</span>
                                <span className="text-white">~cart</span>
                            </div>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=1200&fit=crop&q=80" 
                            alt="Shopping" 
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-900/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-10 text-white animate-fade-in-up-delay-1">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                            <p className="text-indigo-200">Discover premium products and enjoy a seamless shopping experience.</p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 p-10 lg:p-14 bg-white flex flex-col justify-center relative">
                        {/* Mobile Logo */}
                        <div className="md:hidden mb-8 flex justify-center animate-fade-in">
                            <div className="text-5xl font-extrabold text-center tracking-tight italic flex justify-center items-center cursor-pointer" onClick={() => navigate('/')}>
                                <span className="text-emerald-500 drop-shadow-sm">A2Z</span>
                                <span className="text-indigo-950 drop-shadow-sm">~cart</span>
                            </div>
                        </div>

                        <div className="mb-8 animate-fade-in-up">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
                            <p className="text-sm text-gray-500">Enter your email and password to access your cart.</p>
                        </div>

                        {error && <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-6 text-sm font-medium flex items-center"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>{error}</div>}
                        {success && <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-lg mb-6 text-sm font-medium flex items-center animate-fade-in"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>{success}</div>}
                        
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="animate-fade-in-up-delay-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="animate-fade-in-up-delay-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <input 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                                        type="password" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className={`animate-fade-in-up-delay-3 w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-950 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition-all ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up-delay-3">
                            Don't have an account?{' '}
                            <Link className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors" to="/register">
                                Create one now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
