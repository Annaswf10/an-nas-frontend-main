import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null); // পপ-আপে দেখানোর জন্য

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/messages');
            setMessages(response.data.data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
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
                    await axios.delete(`http://localhost:5000/api/messages/${id}`);
                    Swal.fire('Deleted!', 'Message has been deleted.', 'success');
                    fetchMessages();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete message.', 'error');
                }
            }
        });
    };

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header text-white py-3 rounded-top-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#006a4e' }}>
                    <h5 className="mb-0 fw-bold px-2"><i className="fa-solid fa-envelope-open-text me-2"></i> User Messages</h5>
                    <span className="badge bg-white text-success rounded-pill px-3">{messages.length} Messages</span>
                </div>
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5 text-muted">Loading messages...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="py-3">Sender Info</th>
                                        <th className="py-3">Subject</th>
                                        <th className="py-3">Message (Snippet)</th>
                                        <th className="text-end px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((msg) => (
                                        <tr key={msg.id}>
                                            <td className="px-4 text-muted small">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div className="fw-bold" style={{ color: '#006a4e' }}>{msg.name}</div>
                                                <div className="small text-muted">
                                                    <i className="fa-solid fa-envelope me-1"></i> {msg.email || 'N/A'} <br/>
                                                    <i className="fa-solid fa-phone me-1"></i> {msg.phone || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="fw-semibold">{msg.subject || 'No Subject'}</td>
                                            <td style={{ maxWidth: '250px' }}>
                                                <div className="text-truncate text-muted" title={msg.message}>
                                                    {msg.message}
                                                </div>
                                            </td>
                                            <td className="text-end px-4">
                                                <button 
                                                    onClick={() => setSelectedMessage(msg)}
                                                    className="btn btn-sm btn-outline-success me-2 shadow-sm"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#messageModal"
                                                >
                                                    <i className="fa-regular fa-eye"></i> View
                                                </button>
                                                <button onClick={() => handleDelete(msg.id)} className="btn btn-sm btn-outline-danger shadow-sm">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {messages.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted py-5">
                                                <i className="fa-regular fa-envelope-open fs-1 mb-3 text-light"></i><br/>
                                                No messages found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Details Modal */}
            <div className="modal fade" id="messageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        {selectedMessage && (
                            <>
                                <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                                    <h5 className="fw-bold" style={{ color: '#006a4e' }}>Message Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="bg-light p-3 rounded-3 mb-4 border">
                                        <div className="row mb-2">
                                            <div className="col-4 text-muted fw-semibold">Name:</div>
                                            <div className="col-8 fw-bold">{selectedMessage.name}</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-4 text-muted fw-semibold">Email:</div>
                                            <div className="col-8">{selectedMessage.email || 'N/A'}</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-4 text-muted fw-semibold">Phone:</div>
                                            <div className="col-8">{selectedMessage.phone || 'N/A'}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 text-muted fw-semibold">Subject:</div>
                                            <div className="col-8 fw-bold">{selectedMessage.subject || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <h6 className="fw-bold text-muted mb-2">Message:</h6>
                                    <div className="p-3 bg-white border rounded-3 text-dark" style={{ minHeight: '100px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                        {selectedMessage.message}
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 px-4 pb-4">
                                    <button type="button" className="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Close</button>
                                    <a href={`mailto:${selectedMessage.email}`} className="btn rounded-pill px-4 text-white" style={{ backgroundColor: '#F5A623' }}>
                                        <i className="fa-solid fa-reply me-2"></i> Reply via Email
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;