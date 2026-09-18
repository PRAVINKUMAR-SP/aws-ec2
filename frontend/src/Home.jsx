import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="glass-card" style={{ textAlign: 'center' }}>
            <h1>wellcome to our project created by pravinkumar</h1>
            <p style={{ margin: '20px 0', color: 'var(--text-muted)' }}>
                You have successfully logged in.
            </p>
            <button onClick={handleLogout} className="btn-primary" style={{ width: 'auto', padding: '10px 30px' }}>
                Logout
            </button>
        </div>
    );
};

export default Home;
