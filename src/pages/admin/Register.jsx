import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, formData);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: response.data.message,
                    confirmButtonColor: '#006a4e'
                });
                navigate('/admin/login'); // রেজিস্ট্রেশন সফল হলে লগিন পেজে পাঠিয়ে দেবে
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: '400px' }}>
                <h3 className="text-center fw-bold mb-4" style={{ color: '#006a4e' }}>Admin Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input type="text" name="name" className="form-control py-2" value={formData.name} onChange={handleChange} required placeholder="Enter full name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input type="email" name="email" className="form-control py-2" value={formData.email} onChange={handleChange} required placeholder="Enter email address" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input type="password" name="password" className="form-control py-2" value={formData.password} onChange={handleChange} required placeholder="Create a strong password" />
                    </div>
                    <button type="submit" className="btn w-100 py-2 fw-bold text-white" style={{ backgroundColor: '#006a4e' }} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0 text-muted">Already have an account? <Link to="/admin/login" style={{ color: '#006a4e', fontWeight: 'bold' }}>Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;