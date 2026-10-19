import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminGallery = () => {
    const [type, setType] = useState('photo');
    const [category, setCategory] = useState('বন্যা');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    
    // গ্যালারির ডাটা ধরে রাখার স্টেট
    const [galleries, setGalleries] = useState([]);

    const categories = ['বন্যা', 'খাদ্য বিতরণ', 'স্বাবলম্বীকরণ', 'কুরবানী', 'শীতবস্ত্র বিতরণ'];

    // ডাটাবেস থেকে সব ডাটা নিয়ে আসার ফাংশন
    const fetchGalleries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/galleries');
            setGalleries(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // পেজ লোড হলেই ডাটাগুলো কল করবে
    useEffect(() => {
        fetchGalleries();
    }, []);

    // নতুন ডাটা আপলোড করার ফাংশন
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('type', type);
        formData.append('category', category);
        formData.append('title', title);

        if (type === 'photo') {
            if (!image) {
                Swal.fire('Error', 'অনুগ্রহ করে একটি ছবি নির্বাচন করুন!', 'error');
                setLoading(false); return;
            }
            formData.append('image', image);
        } else {
            if (!videoUrl) {
                Swal.fire('Error', 'অনুগ্রহ করে ভিডিওর লিংক দিন!', 'error');
                setLoading(false); return;
            }
            formData.append('video_url', videoUrl);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/galleries/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                Swal.fire('Success!', 'সফলভাবে গ্যালারিতে আপলোড হয়েছে।', 'success');
                setTitle(''); setImage(null); setVideoUrl('');
                fetchGalleries(); // আপলোড হওয়ার পর টেবিল রিফ্রেশ করবে
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
                    await axios.delete(`http://localhost:5000/api/galleries/${id}`);
                    Swal.fire('ডিলিট হয়েছে!', 'ফাইলটি মুছে ফেলা হয়েছে।', 'success');
                    fetchGalleries(); // ডিলিট হওয়ার পর টেবিল রিফ্রেশ করবে
                } catch (error) {
                    Swal.fire('Error!', 'ডিলিট করতে সমস্যা হয়েছে।', 'error');
                }
            }
        });
    };

    // ক্যাটাগরি এবং টাইটেল এডিট করার ফাংশন
    const handleEdit = async (item) => {
        const { value: formValues } = await Swal.fire({
            title: 'এডিট করুন',
            html: `
                <select id="swal-category" class="form-select mb-3">
                    ${categories.map(c => `<option value="${c}" ${c === item.category ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                <input id="swal-title" class="form-control" value="${item.title || ''}" placeholder="টাইটেল দিন">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#006a4e',
            preConfirm: () => {
                return {
                    category: document.getElementById('swal-category').value,
                    title: document.getElementById('swal-title').value
                }
            }
        });

        if (formValues) {
            try {
                await axios.put(`http://localhost:5000/api/galleries/${item.id}`, formValues);
                Swal.fire('সফল!', 'আপডেট করা হয়েছে।', 'success');
                fetchGalleries(); // আপডেট হওয়ার পর টেবিল রিফ্রেশ করবে
            } catch (error) {
                Swal.fire('Error!', 'আপডেট ব্যর্থ হয়েছে।', 'error');
            }
        }
    };

    return (
        <div className="container py-4">
            {/* Upload Section */}
            <div className="card shadow-sm border-0 rounded-4 mx-auto mb-5" style={{ maxWidth: '700px' }}>
                <div className="card-header text-white text-center py-3 rounded-top-4" style={{ backgroundColor: '#006a4e' }}>
                    <h5 className="mb-0 fw-bold">Upload to Gallery</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Type</label>
                                <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="photo">Photo (ছবি)</option>
                                    <option value="video">Video (ভিডিও)</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Category</label>
                                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Title (Optional)</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ছবির বা ভিডিওর শিরোনাম" />
                            </div>

                            {type === 'photo' ? (
                                <div className="col-12">
                                    <label className="form-label fw-semibold">Upload Image</label>
                                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            ) : (
                                <div className="col-12">
                                    <label className="form-label fw-semibold">YouTube Video URL</label>
                                    <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                                </div>
                            )}

                            <div className="col-12 mt-3">
                                <button type="submit" className="btn w-100 fw-bold text-white py-2" style={{ backgroundColor: '#006a4e' }} disabled={loading}>
                                    {loading ? 'Uploading...' : 'Upload Media'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Gallery List Section */}
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white py-3 border-bottom">
                    <h5 className="mb-0 fw-bold theme-text">Manage Gallery Items</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Media</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {galleries.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            {item.type === 'photo' ? (
                                                <img src={item.image_url} alt="Gallery" className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                            ) : (
                                                <span className="badge bg-danger">YouTube Video</span>
                                            )}
                                        </td>
                                        <td className="text-capitalize">{item.type}</td>
                                        <td>{item.category}</td>
                                        <td>{item.title || '-'}</td>
                                        <td className="text-end">
                                            <button onClick={() => handleEdit(item)} className="btn btn-sm btn-primary me-2">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {galleries.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted py-4">কোনো ডাটা পাওয়া যায়নি।</td>
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

export default AdminGallery;