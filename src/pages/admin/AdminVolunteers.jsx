import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/volunteer');
            setVolunteers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching volunteers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#006a4e',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/volunteer/${id}`);
                    Swal.fire('Deleted!', 'Volunteer application has been deleted.', 'success');
                    fetchVolunteers();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete application.', 'error');
                }
            }
        });
    };

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header text-white py-3 rounded-top-4" style={{ backgroundColor: '#006a4e' }}>
                    <h5 className="mb-0 fw-bold px-2">Manage Volunteer Applications</h5>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5 text-muted fw-semibold">Loading data...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3">Photo</th>
                                        <th className="py-3">Name</th>
                                        <th className="py-3">Contact Info</th>
                                        <th className="py-3">Address</th>
                                        <th className="py-3">Reason</th>
                                        <th className="text-end px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {volunteers.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4">
                                                {item.image_url ? (
                                                    <img 
                                                        src={item.image_url} 
                                                        alt={item.name} 
                                                        className="rounded-circle shadow-sm" 
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                                    />
                                                ) : (
                                                    <div className="rounded-circle d-flex justify-content-center align-items-center text-white shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#F5A623' }}>
                                                        <i className="fa-solid fa-user"></i>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="fw-bold" style={{ color: '#006a4e' }}>{item.name}</td>
                                            <td>
                                                <div className="small mb-1">
                                                    <i className="fa-solid fa-phone text-muted me-2"></i>{item.phone}
                                                </div>
                                                {item.email && (
                                                    <div className="small">
                                                        <i className="fa-solid fa-envelope text-muted me-2"></i>{item.email}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="small text-muted">{item.address}</td>
                                            <td className="small text-muted" style={{ maxWidth: '200px' }}>
                                                <div className="text-truncate" title={item.reason}>{item.reason}</div>
                                            </td>
                                            <td className="text-end px-4">
                                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger shadow-sm">
                                                    <i className="fa-solid fa-trash me-1"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {volunteers.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-5">
                                                <i className="fa-solid fa-folder-open mb-3 fs-1 text-light"></i>
                                                <br />
                                                No volunteer applications found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminVolunteers;