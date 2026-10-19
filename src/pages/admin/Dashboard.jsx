import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    // ডাটা ধরে রাখার স্টেট
    const [stats, setStats] = useState({
        volunteers: 0,
        messages: 0,
        activities: 0,
        gallery: 0,
        totalDonationAmount: 0,
        totalDonors: 0,
        blogs: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // ১. ড্যাশবোর্ডের মূল ডাটা আনা
                const response = await axios.get('http://localhost:5000/api/dashboard/stats');
                let dashboardData = response.data.success ? response.data.data : {};

                // ২. ব্লগের ডাটা আনা
                const blogRes = await axios.get('http://localhost:5000/api/blogs');
                const totalBlogs = blogRes.data.success ? blogRes.data.data.length : 0;

                // ৩. স্টেট আপডেট করা (সব ডাটা একসাথে)
                setStats({
                    ...dashboardData,
                    blogs: totalBlogs
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return <div className="p-5 text-center text-muted fw-bold">Loading Overview...</div>;
    }

    return (
        <div className="container py-3">
            <h4 className="fw-bold mb-4" style={{ color: '#006a4e' }}>
                <i className="fa-solid fa-chart-pie me-2"></i> Dashboard Overview
            </h4>
            
            <div className="row g-4">
                {/* Total Donations */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#006a4e' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">Total Donations</h6>
                            <h2 className="fw-bold mb-0">৳ {Number(stats.totalDonationAmount || 0).toLocaleString('en-IN')}</h2>
                            <small className="opacity-75">From {stats.totalDonors || 0} Donors</small>
                        </div>
                        <i className="fa-solid fa-hand-holding-dollar fs-1 opacity-50"></i>
                    </div>
                </div>

                {/* Volunteers */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#f5a623' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">Active Volunteers</h6>
                            <h2 className="fw-bold mb-0">{stats.volunteers || 0}</h2>
                        </div>
                        <i className="fa-solid fa-users fs-1 opacity-50"></i>
                    </div>
                </div>

                {/* Messages */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#17a2b8' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">User Messages</h6>
                            <h2 className="fw-bold mb-0">{stats.messages || 0}</h2>
                        </div>
                        <i className="fa-solid fa-envelope fs-1 opacity-50"></i>
                    </div>
                </div>

                {/* Gallery Items */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#6c757d' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">Gallery Items</h6>
                            <h2 className="fw-bold mb-0">{stats.gallery || 0}</h2>
                        </div>
                        <i className="fa-solid fa-images fs-1 opacity-50"></i>
                    </div>
                </div>

                {/* Activities */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#20c997' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">Total Activities</h6>
                            <h2 className="fw-bold mb-0">{stats.activities || 0}</h2>
                        </div>
                        <i className="fa-solid fa-person-digging fs-1 opacity-50"></i>
                    </div>
                </div>

                {/* News & Blogs */}
                <div className="col-md-4">
                    <div className="card text-white border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center justify-content-between" style={{ backgroundColor: '#092741' }}>
                        <div>
                            <h6 className="mb-1 opacity-75">News & Blogs</h6>
                            <h2 className="fw-bold mb-0">{stats.blogs || 0}</h2>
                        </div>
                       
                        <i className="fa-solid fa-newspaper fs-1 opacity-50"></i> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;