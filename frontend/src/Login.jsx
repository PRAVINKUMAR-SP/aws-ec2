import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post('/api/auth/login', { email, password });
            setSuccess('Login successful. Redirecting...');
            setTimeout(() => navigate('/main'), 1500);
        } catch (err) {
            setError('Login failed: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="glass-card">
            <h2>Welcome Back</h2>
            {error && <div className="message error">{error}</div>}
            {success && <div className="message success">{success}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Enter your email address"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Sign In</button>
            </form>
            <div className="auth-footer">
                <p>Don't have an account? <Link to="/register">Create one now</Link></p>
            </div>
        </div>
    );
};

export default Login;
