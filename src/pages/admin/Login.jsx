import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, formData);
            if (response.data.success) {
                // টোকেন এবং এডমিনের ডাটা ব্রাউজারের লোকাল স্টোরেজে সেভ করা হচ্ছে
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminData', JSON.stringify(response.data.admin));

                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Logged in successfully.',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                // লগিন সফল হলে ড্যাশবোর্ডে পাঠিয়ে দেবে
                navigate('/admin/dashboard'); 
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'Invalid credentials!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: '400px' }}>
                <h3 className="text-center fw-bold mb-4" style={{ color: '#006a4e' }}>Admin Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input type="email" name="email" className="form-control py-2" value={formData.email} onChange={handleChange} required placeholder="Enter email address" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input type="password" name="password" className="form-control py-2" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn w-100 py-2 fw-bold text-white" style={{ backgroundColor: '#006a4e' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0 text-muted">Don't have an account? <Link to="/admin/register" style={{ color: '#006a4e', fontWeight: 'bold' }}>Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;