import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

const AdminActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    // ফর্মের স্টেট (Date রিমুভ করা হয়েছে)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // প্রিভিউ দেখানোর জন্য নতুন স্টেট

    // ডাটা নিয়ে আসার ফাংশন
    const fetchActivities = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/activities`);
            setActivities(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // ছবি সিলেক্ট করলে সাথে সাথে প্রিভিউ দেখানোর ফাংশন
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // ইমেজের লাইভ লিংক তৈরি
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    // নতুন ডাটা সাবমিট করার ফাংশন
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            Swal.fire('Error', 'অনুগ্রহ করে টাইটেল এবং বিবরণ দিন!', 'error');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post(`${API_URL}/api/activities/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                Swal.fire('Success!', 'কার্যক্রম সফলভাবে যোগ করা হয়েছে।', 'success');
                // আপলোডের পর ফর্ম ও প্রিভিউ ক্লিয়ার করা
                setTitle(''); 
                setDescription(''); 
                setImage(null);
                setImagePreview(null); 
                document.getElementById('activity-image').value = '';
                fetchActivities(); // টেবিল রিফ্রেশ
            }
        } catch (error) {
            Swal.fire('Error!', 'আপলোড ব্যর্থ হয়েছে।', 'error');
        } finally {
            setLoading(false);
        }
    };

    // ডিলিট করার ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "এটি ডিলিট করলে আর ফেরত পাওয়া যাবে না!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#006a4e',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/api/activities/${id}`);
                    Swal.fire('ডিলিট হয়েছে!', 'ফাইলটি মুছে ফেলা হয়েছে।', 'success');
                    fetchActivities();
                } catch (error) {
                    Swal.fire('Error!', 'ডিলিট করতে সমস্যা হয়েছে।', 'error');
                }
            }
        });
    };

    return (
        <div className="container py-4">
            {/* Upload Form */}
            <div className="card shadow-sm border-0 rounded-4 mx-auto mb-5">
                <div className="card-header text-white py-3 rounded-top-4" style={{ backgroundColor: '#006a4e' }}>
                    <h5 className="mb-0 fw-bold px-2">Add New Activity</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Activity Title *</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="কার্যক্রমের নাম" />
                            </div>
                            
                            <div className="col-12">
                                <label className="form-label fw-semibold">Description *</label>
                                <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="কার্যক্রমের বিস্তারিত বিবরণ লিখুন..."></textarea>
                            </div>
                            
                            <div className="col-12">
                                <label className="form-label fw-semibold">Upload Image</label>
                                <input type="file" id="activity-image" className="form-control" accept="image/*" onChange={handleImageChange} />
                                
                                {/* Image Preview Section */}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="text-muted small mb-2 fw-bold">Image Preview:</p>
                                        <div className="d-inline-block position-relative">
                                            <img src={imagePreview} alt="Preview" className="rounded shadow-sm border" style={{ maxHeight: '180px', objectFit: 'contain' }} />
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle shadow"
                                                onClick={() => {
                                                    setImage(null);
                                                    setImagePreview(null);
                                                    document.getElementById('activity-image').value = '';
                                                }}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="col-12 mt-4 text-end">
                                <button type="submit" className="btn px-5 fw-bold text-white py-2" style={{ backgroundColor: '#006a4e' }} disabled={loading}>
                                    {loading ? 'Uploading...' : 'Publish Activity'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Activities Table */}
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white py-3 border-bottom">
                    <h5 className="mb-0 fw-bold theme-text">Manage Activities</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="py-3">Title</th>
                                    <th className="text-end px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `${API_URL}/uploads/${item.image}`) : 'https://via.placeholder.com/60'} 
                                                alt="Activity" 
                                                className="rounded shadow-sm" 
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                                            />
                                        </td>
                                        <td className="fw-semibold">{item.title}</td>
                                        <td className="text-end px-4">
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger">
                                                <i className="fa-solid fa-trash me-1"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {activities.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center text-muted py-5">কোনো কার্যক্রম পাওয়া যায়নি।</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminActivities;