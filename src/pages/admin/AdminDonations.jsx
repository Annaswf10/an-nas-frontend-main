import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

// প্রতিটা অবস্থার রং আর লেখা
const STATUS_STYLES = {
    pending: { label: 'Pending', className: 'bg-warning bg-opacity-25 text-dark' },
    verified: { label: 'Verified', className: 'bg-success bg-opacity-10 text-success' },
    rejected: { label: 'Rejected', className: 'bg-danger bg-opacity-10 text-danger' },
};

const FILTERS = [
    { value: 'pending', label: 'Pending' },
    { value: 'verified', label: 'Verified' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'all', label: 'All' },
];

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [summary, setSummary] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const query = filter === 'all' ? '' : `?status=${filter}`;
            const [donationRes, summaryRes] = await Promise.all([
                axios.get(`${API_URL}/api/donations${query}`),
                axios.get(`${API_URL}/api/donations/summary`),
            ]);
            setDonations(donationRes.data.data || []);
            setSummary(summaryRes.data.data || []);
        } catch (error) {
            console.error('Error fetching donations', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateStatus = async (item, status) => {
        const isVerify = status === 'verified';
        const isReject = status === 'rejected';

        const confirm = await Swal.fire({
            icon: isReject ? 'warning' : 'question',
            title: isVerify ? 'Verify this donation?' : isReject ? 'Reject this donation?' : 'Move back to pending?',
            html: `
                <div class="text-start small">
                    <div><b>Donor:</b> ${escapeHtml(item.donor_name)}</div>
                    <div><b>Amount:</b> ৳ ${Number(item.amount).toLocaleString()}</div>
                    <div><b>Method:</b> ${escapeHtml(item.payment_method || 'N/A')}</div>
                    <div><b>TrxID:</b> ${escapeHtml(item.transaction_id || '-')}</div>
                    ${isVerify ? '<hr/><div class="text-success">Confirm you found this TrxID and amount in the bKash/Nagad/bank statement.</div>' : ''}
                </div>`,
            showCancelButton: true,
            confirmButtonText: isVerify ? 'Yes, verified' : isReject ? 'Yes, reject' : 'Yes, move',
            confirmButtonColor: isReject ? '#d33' : '#006a4e',
        });
        if (!confirm.isConfirmed) return;

        setUpdatingId(item.id);
        try {
            await axios.patch(`${API_URL}/api/donations/${item.id}/status`, { status });
            await fetchData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.message || 'Could not update the donation.',
            });
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="container-fluid py-4">
            {/* Fund Summary Cards (শুধু যাচাই করা donation) */}
            <h6 className="text-muted mb-3">
                Verified totals by fund <small>(only verified donations are counted)</small>
            </h6>
            <div className="row g-4 mb-5">
                {summary.length === 0 && (
                    <div className="col-12 text-muted small">No verified donations yet.</div>
                )}
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
                <div className="card-header bg-white py-3 border-bottom d-flex flex-wrap gap-2 justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold theme-text">Donations</h5>
                    <div className="btn-group btn-group-sm" role="group">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                type="button"
                                className={`btn ${filter === f.value ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5 text-muted">Loading data...</div>
                    ) : donations.length === 0 ? (
                        <div className="text-center py-5 text-muted">No donations in this list.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="py-3">Donor Info</th>
                                        <th className="py-3">Fund Category</th>
                                        <th className="py-3">Amount</th>
                                        <th className="py-3">Payment / TrxID</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3 text-end px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((item) => {
                                        const status = item.status || 'pending';
                                        const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
                                        const busy = updatingId === item.id;
                                        return (
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
                                                    {item.payment_method || 'N/A'} <br />
                                                    <span className="fw-semibold text-dark" style={{ fontSize: '0.85em' }}>
                                                        {item.transaction_id || '-'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge px-3 py-2 rounded-pill ${style.className}`}>
                                                        {style.label}
                                                    </span>
                                                </td>
                                                <td className="text-end px-4 text-nowrap">
                                                    {status !== 'verified' && (
                                                        <button
                                                            className="btn btn-sm btn-success me-1"
                                                            disabled={busy}
                                                            onClick={() => updateStatus(item, 'verified')}
                                                        >
                                                            <i className="fa-solid fa-check me-1"></i>Verify
                                                        </button>
                                                    )}
                                                    {status !== 'rejected' && (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger me-1"
                                                            disabled={busy}
                                                            onClick={() => updateStatus(item, 'rejected')}
                                                        >
                                                            <i className="fa-solid fa-xmark me-1"></i>Reject
                                                        </button>
                                                    )}
                                                    {status !== 'pending' && (
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            disabled={busy}
                                                            onClick={() => updateStatus(item, 'pending')}
                                                        >
                                                            Undo
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// দাতার দেওয়া লেখা popup-এ দেখানোর আগে নিরাপদ করা (HTML কোড যেন না চলে)
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export default AdminDonations;
