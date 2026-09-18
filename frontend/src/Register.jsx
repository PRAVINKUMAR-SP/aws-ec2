import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post('/api/auth/register', { name, email, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Registration failed: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="glass-card">
            <h2>Create Account</h2>
            {error && <div className="message error">{error}</div>}
            {success && <div className="message success">{success}</div>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter your full name"
                        required
                    />
                </div>
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
                        placeholder="Choose a strong password"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Register</button>
            </form>
            <div className="auth-footer">
                <p>Already have an account? <Link to="/login">Sign in here</Link></p>
            </div>
        </div>
    );
};

export default Register;
