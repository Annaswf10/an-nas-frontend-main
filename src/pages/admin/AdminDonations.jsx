import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [donationRes, summaryRes] = await Promise.all([
                axios.get('http://localhost:5000/api/donations'),
                axios.get('http://localhost:5000/api/donations/summary')
            ]);
            setDonations(donationRes.data.data || []);
            setSummary(summaryRes.data.data || []);
        } catch (error) {
            console.error("Error fetching donations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid py-4">
            {/* Fund Summary Cards */}
            <div className="row g-4 mb-5">
                {summary.map((fund, index) => (
                    <div key={index} className="col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100" style={{ borderTop: '4px solid #006a4e' }}>
                            <h6 className="text-muted fw-bold mb-2">{fund.fund_name}</h6>
                            <h3 className="fw-bold" style={{ color: '#006a4e' }}>৳ {Number(fund.total_amount).toLocaleString()}</h3>
                            <small className="text-muted">{fund.total_donors} Donors</small>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Donations Table */}
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold theme-text">Recent Donations</h5>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5 text-muted">Loading data...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="py-3">Donor Info</th>
                                        <th className="py-3">Fund Category</th>
                                        <th className="py-3">Amount</th>
                                        <th className="py-3">Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 text-muted small">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div className="fw-bold">{item.donor_name}</div>
                                                <div className="small text-muted">{item.phone}</div>
                                            </td>
                                            <td>
                                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                                                    {item.fund_name}
                                                </span>
                                            </td>
                                            <td className="fw-bold" style={{ color: '#006a4e' }}>
                                                ৳ {Number(item.amount).toLocaleString()}
                                            </td>
                                            <td className="small text-muted">
                                                {item.payment_method || 'N/A'} <br/>
                                                <span style={{ fontSize: '0.8em' }}>{item.transaction_id}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDonations;