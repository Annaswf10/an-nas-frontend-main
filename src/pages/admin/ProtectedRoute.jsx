import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // লোকাল স্টোরেজ থেকে টোকেন চেক করা হচ্ছে
    const token = localStorage.getItem('adminToken');
    
    // টোকেন না থাকলে লগিন পেজে পাঠিয়ে দেবে
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }
    
    // টোকেন থাকলে ড্যাশবোর্ড বা কাঙ্ক্ষিত পেজ দেখাবে
    return children;
};

export default ProtectedRoute;