import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/blogs')
      .then((response) => {
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('uploads/')) return `http://localhost:5000/${imagePath}`;
    if (imagePath.startsWith('uploads\\'))
      return `http://localhost:5000/${imagePath.replace('\\', '/')}`;
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  return (
    <main className="bg-light pb-5 min-vh-100">
      {/* নতুন যোগ করা স্টাইল যা ডিজাইন ভাঙতে দিবে না */}
      <style>
        {`
          .blog-content-wrapper { 
            overflow-x: hidden !important; 
            width: 100% !important;
          }
          .blog-content-wrapper * {
            max-width: 100% !important;
            white-space: normal !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
            box-sizing: border-box !important;
          }
          .blog-content-wrapper img { 
            max-width: 100% !important; 
            height: auto !important; 
            border-radius: 8px; 
          }
          .blog-content-wrapper ul, .blog-content-wrapper ol { 
            padding-left: 20px !important; 
            margin-left: 0 !important; 
          }
          .blog-content-wrapper ul { list-style-type: disc !important; }
          .blog-content-wrapper ol { list-style-type: decimal !important; }
          .blog-content-wrapper p, .blog-content-wrapper h1, .blog-content-wrapper h2, .blog-content-wrapper h3, .blog-content-wrapper h4, .blog-content-wrapper h5, .blog-content-wrapper h6 {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100% !important;
          }
        `}
      </style>

      <header
        className="page-header d-flex align-items-center justify-content-center mb-5"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.85), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c') center/cover",
          minHeight: '300px',
          padding: '50px 15px',
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">{t('news_title') || 'News & Articles'}</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
            আমাদের ফাউন্ডেশনের সর্বশেষ খবর, আপডেট এবং সচেতনতামূলক আর্টিকেলগুলো পড়ুন।
          </p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4">
          {blogs.map((blog) => {
            const blogImage = getImageUrl(blog.image);
            const displayTitle = currentLang === 'bn' && blog.title_bn ? blog.title_bn : blog.title;
            const displayDesc =
              currentLang === 'bn' && blog.description_bn ? blog.description_bn : blog.description;

            // HTML tag gulo remove kore shudhu plain text ber kora hocche jate design na bhenge jay
            const plainTextDesc = displayDesc ? displayDesc.replace(/<[^>]+>/g, '') : '';

            return (
              <div key={blog.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden d-flex flex-column"
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {blogImage && (
                    <div className="position-relative">
                      <img
                        src={blogImage}
                        alt={displayTitle}
                        className="card-img-top w-100"
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div className="card-body p-4 d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-center mb-3 text-muted"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <span>
                        <i className="fa-regular fa-clock me-1"></i>
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="fw-semibold" style={{ color: '#F5A623' }}>
                        <i className="fa-solid fa-user-pen me-1"></i>
                        {blog.author || 'Admin'}
                      </span>
                    </div>

                    <h5
                      className="fw-bold mb-3"
                      style={{ color: '#006a4e', lineHeight: '1.4', fontSize: '1.25rem' }}
                    >
                      {displayTitle}
                    </h5>

                    <p
                      className="text-muted mb-4 flex-grow-1"
                      style={{
                        fontSize: '0.95rem',
                        textAlign: 'justify',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.6',
                      }}
                    >
                      {plainTextDesc}
                    </p>

                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="btn w-100 py-2 fw-bold mt-auto rounded-3"
                      style={{ backgroundColor: '#006a4e', color: 'white' }}
                      data-bs-toggle="modal"
                      data-bs-target="#blogDetailsModal"
                    >
                      Read Article <i className="fa-solid fa-book-open ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {blogs.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="p-5 bg-white rounded-4 shadow-sm border">
                <i
                  className="fa-regular fa-newspaper text-muted mb-3"
                  style={{ fontSize: '3rem' }}
                ></i>
                <h4 className="text-muted fw-bold">এখনো কোনো নিউজ বা ব্লগ প্রকাশ করা হয়নি।</h4>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Details Modal */}
      <div className="modal fade" id="blogDetailsModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            {selectedBlog && (
              <>
                {getImageUrl(selectedBlog.image) && (
                  <div
                    className="position-relative w-100"
                    style={{ maxHeight: '400px', overflow: 'hidden' }}
                  >
                    <img
                      src={getImageUrl(selectedBlog.image)}
                      alt={
                        currentLang === 'bn' && selectedBlog.title_bn
                          ? selectedBlog.title_bn
                          : selectedBlog.title
                      }
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2 shadow"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <div className="modal-body p-3 p-md-5 bg-white">
                  {!getImageUrl(selectedBlog.image) && (
                    <button
                      type="button"
                      className="btn-close float-end mb-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  )}

                  <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 pb-3 border-bottom gap-2">
                    <span
                      className="badge bg-opacity-10 text-success rounded-pill px-3 py-2 fw-semibold"
                      style={{ backgroundColor: 'rgba(0, 106, 78, 0.1)', color: '#006a4e' }}
                    >
                      <i className="fa-regular fa-calendar me-2"></i>
                      {new Date(selectedBlog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-muted fw-bold">
                      <i className="fa-solid fa-user-pen me-2"></i> {selectedBlog.author || 'Admin'}
                    </span>
                  </div>

                  <h2
                    className="fw-bold mb-4"
                    style={{ color: '#006a4e', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                  >
                    {currentLang === 'bn' && selectedBlog.title_bn
                      ? selectedBlog.title_bn
                      : selectedBlog.title}
                  </h2>

                  {/* Ekhane boro lekha ar style soho full details dekhabe */}
                  <div
                    className="text-dark w-100 blog-content-wrapper"
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      textAlign: 'justify',
                      overflowWrap: 'break-word',
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        currentLang === 'bn' && selectedBlog.description_bn
                          ? selectedBlog.description_bn
                          : selectedBlog.description,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
