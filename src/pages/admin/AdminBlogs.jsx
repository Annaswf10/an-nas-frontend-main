import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            if (response.data.success) setBlogs(response.data.data);
        } catch (error) {
            console.error('Error fetching blogs');
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: "ডিলিট করলে এই নিউজটি আর ফিরে পাবেন না!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'হ্যাঁ, ডিলিট করুন!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/blogs/delete/${id}`);
                    Swal.fire('Deleted!', 'নিউজটি ডিলিট করা হয়েছে।', 'success');
                    fetchBlogs(); // লিস্ট আপডেট করা
                } catch (error) {
                    Swal.fire('Error!', 'ডিলিট করতে সমস্যা হয়েছে।', 'error');
                }
            }
        });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Manage News & Blogs</h3>
                <Link to="/admin/add-blog" className="btn btn-success fw-bold">+ Add News</Link>
            </div>
            
            <div className="table-responsive bg-white p-3 rounded shadow-sm">
                <table className="table table-hover align-middle">
                    <thead className="table-success">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={blog.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {blog.image ? (
                                        <img src={`http://localhost:5000/uploads/${blog.image}`} alt="blog" style={{width: '60px', height: '40px', objectFit: 'cover', borderRadius: '5px'}} />
                                    ) : (
                                        <span className="badge bg-secondary">No Image</span>
                                    )}
                                </td>
                                <td style={{maxWidth: '250px'}} className="text-truncate">{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/admin/edit-blog/${blog.id}`} className="btn btn-sm btn-primary me-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={() => handleDelete(blog.id)} className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && <tr><td colSpan="6" className="text-center py-4">কোনো নিউজ পাওয়া যায়নি।</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBlogs;