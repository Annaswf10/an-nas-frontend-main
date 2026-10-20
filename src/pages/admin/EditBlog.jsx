import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editorEn = useRef(null);
  const editorBn = useRef(null);

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  // English এডিটরের জন্য আলাদা কনফিগারেশন
  const configEn = {
    minHeight: 350,
    height: 'auto',
    allowResizeY: true,
    defaultActionOnPaste: 'insert_clear_html',
  };

  // Bengali এডিটরের জন্য সম্পূর্ণ আলাদা কনফিগারেশন
  const configBn = {
    minHeight: 350,
    height: 'auto',
    allowResizeY: true,
    defaultActionOnPaste: 'insert_clear_html',
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blogs/${id}`)
      .then((res) => {
        if (res.data.success) {
          setTitleEn(res.data.data.title || '');
          setTitleBn(res.data.data.title_bn || '');
          setContentEn(res.data.data.description || '');
          setContentBn(res.data.data.description_bn || '');
          setAuthor(res.data.data.author || '');
        }
      })
      .catch((err) => console.error('Error fetching blog details:', err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', titleEn);
    formData.append('title_bn', titleBn);
    formData.append('description', contentEn);
    formData.append('description_bn', contentBn);
    formData.append('author', author);
    if (image) formData.append('image', image);

    try {
      const response = await axios.put(`${API_URL}/api/blogs/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        Swal.fire('Updated!', 'News updated successfully!', 'success');
        navigate('/admin/blogs');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update news.', 'error');
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Edit Article (Multi-Language)</h3>
      <form onSubmit={handleUpdate} className="bg-white p-4 shadow-sm rounded">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Title (English)</label>
            <input
              type="text"
              className="form-control"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Title (Bengali)</label>
            <input
              type="text"
              className="form-control"
              value={titleBn}
              onChange={(e) => setTitleBn(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Update Cover Image (Leave empty to keep current)
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Content (English)</label>
          <JoditEditor
            ref={editorEn}
            value={contentEn}
            config={configEn}
            onBlur={(newContent) => setContentEn(newContent)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Content (Bengali)</label>
          <JoditEditor
            ref={editorBn}
            value={contentBn}
            config={configBn}
            onBlur={(newContent) => setContentBn(newContent)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Author Name</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary px-4 py-2 fw-bold w-100">
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
