import React, { useState, useRef } from 'react';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { API_URL } from '../../config';

const AddBlog = () => {
  const editorEn = useRef(null);
  const editorBn = useRef(null);

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', titleEn);
    formData.append('title_bn', titleBn);
    formData.append('description', contentEn);
    formData.append('description_bn', contentBn);
    formData.append('author', author);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post(`${API_URL}/api/blogs/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Swal.fire('Success', 'News published successfully!', 'success');
        setTitleEn('');
        setTitleBn('');
        setContentEn('');
        setContentBn('');
        setAuthor('');
        setImage(null);
        document.getElementById('imageUpload').value = '';
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to publish news.', 'error');
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Add New Article (Multi-Language)</h3>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded">
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
          <label className="form-label fw-bold">Featured Image</label>
          <input
            type="file"
            id="imageUpload"
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
            config={{ height: 300 }}
            onBlur={(newContent) => setContentEn(newContent)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Content (Bengali)</label>
          <JoditEditor
            ref={editorBn}
            value={contentBn}
            config={{
              minHeight: 350,
              allowResizeY: true, 
              defaultActionOnPaste: 'insert_clear_html', 
            }}
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

        <button type="submit" className="btn btn-success px-4 py-2 fw-bold w-100">
          Publish News
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
