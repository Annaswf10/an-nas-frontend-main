import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { API_URL, mediaUrl } from '../config';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('photo');
  const [activeCategory, setActiveCategory] = useState('সবগুলো');
  const [mediaData, setMediaData] = useState([]);
  const [index, setIndex] = useState(-1); // Lightbox State

  // ডাটাবেসের ক্যাটাগরি ভ্যালু এবং ট্রান্সলেশন লেবেল
  // value = ডাটাবেসে যা সেভ আছে (বাংলা) -> filter এর জন্য
  // label = স্ক্রিনে যা দেখাবে -> ভাষা অনুযায়ী বদলাবে
  const categories = [
    { value: 'সবগুলো', label: t('gal_cat_all', 'সবগুলো') },
    { value: 'বন্যা', label: t('gal_cat_flood', 'বন্যা') },
    { value: 'খাদ্য বিতরণ', label: t('gal_cat_food', 'খাদ্য বিতরণ') },
    { value: 'স্বাবলম্বীকরণ', label: t('gal_cat_empower', 'স্বাবলম্বীকরণ') },
    { value: 'কুরবানী', label: t('gal_cat_qurbani', 'কুরবানী') },
    { value: 'শীতবস্ত্র বিতরণ', label: t('gal_cat_winter', 'শীতবস্ত্র বিতরণ') },
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/galleries`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setMediaData(response.data.data);
        } else if (Array.isArray(response.data)) {
          setMediaData(response.data);
        }
      })
      .catch((error) => console.error('Error fetching gallery data:', error));
  }, []);

  // Activities পেজের মতো নির্ভুল ইমেজ লিংক জেনারেটর
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    if (imagePath.startsWith('http')) return mediaUrl(imagePath);

    // Windows path (uploads\abc\photo.jpg) এর সব '\' কে '/' বানানো
    const cleanPath = imagePath.replace(/\\/g, '/');
    if (cleanPath.startsWith('uploads/')) return `${API_URL}/${cleanPath}`;

    return `${API_URL}/uploads/${cleanPath}`;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;

    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
    } else if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split(/[&#]/)[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // ক্যাটাগরি ও টাইপ ফিল্টারিং
  const filteredMedia = mediaData.filter((item) => {
    const matchTab = item.type === activeTab;
    const matchCategory =
      activeCategory === 'সবগুলো' ||
      (item.category && item.category.trim() === activeCategory.trim());
    return matchTab && matchCategory;
  });

  // Lightbox এর জন্য ছবিগুলোর সঠিক URL সহ Array
  const photoSlides = filteredMedia
    .filter((item) => item.type === 'photo')
    .map((item) => ({ src: getImageUrl(item.image_url || item.image) }));

  return (
    <main className="bg-light pb-5 min-vh-100">
      {/* Header Section */}
      <header
        className="page-header d-flex align-items-center mb-5"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.85), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
          height: '300px',
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">{t('gal_header_title', 'ফটো ও ভিডিও গ্যালারি')}</h1>
          <p className="lead mx-auto mt-2" style={{ maxWidth: '700px' }}>
            {t('gal_header_sub', 'মাঠপর্যায়ে AN-NAS ফাউন্ডেশনের কার্যক্রমের কিছু দৃশ্যমান চিত্র')}
          </p>
        </div>
      </header>

      <div className="container">
        {/* Top Tab Buttons */}
        <div className="d-flex justify-content-center mb-5">
          <div className="bg-white rounded-3 shadow-sm p-1 d-inline-flex">
            <button
              className={`btn px-5 py-2 fw-bold border-0 ${activeTab === 'photo' ? 'bg-success bg-opacity-25 text-success' : 'text-muted bg-white'}`}
              style={{ borderRadius: '8px', transition: 'all 0.3s' }}
              onClick={() => {
                setActiveTab('photo');
                setActiveCategory('সবগুলো');
              }}
            >
              <i className="fa-regular fa-image me-2"></i>
              {t('gal_tab_photo', 'ছবি')}
            </button>
            <button
              className={`btn px-5 py-2 fw-bold border-0 ${activeTab === 'video' ? 'bg-success bg-opacity-25 text-success' : 'text-muted bg-white'}`}
              style={{ borderRadius: '8px', transition: 'all 0.3s' }}
              onClick={() => {
                setActiveTab('video');
                setActiveCategory('সবগুলো');
              }}
            >
              <i className="fa-solid fa-play me-2"></i>
              {t('gal_tab_video', 'ভিডিও')}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* Left Sidebar (Categories) */}
          <div className="col-lg-3">
            <div
              className="card border-0 shadow-sm rounded-4 p-3 sticky-top"
              style={{ top: '100px' }}
            >
              <ul className="list-unstyled mb-0">
                {categories.map((category, idx) => (
                  <li key={category.value} className="mb-2">
                    <button
                      onClick={() => setActiveCategory(category.value)}
                      className="btn w-100 text-start fw-semibold py-2 px-3 border-0"
                      style={{
                        backgroundColor: 'transparent',
                        color: activeCategory === category.value ? '#006a4e' : '#495057',
                        borderLeft:
                          activeCategory === category.value
                            ? '4px solid #006a4e'
                            : '4px solid transparent',
                        borderRadius: '0 8px 8px 0',
                        transition: 'all 0.2s',
                      }}
                    >
                      {category.label}
                    </button>
                    {idx !== categories.length - 1 && <hr className="my-1 text-muted opacity-25" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Area (Media Grid) */}
          <div className="col-lg-9">
            <div className="row g-4">
              {filteredMedia.length > 0 ? (
                filteredMedia.map((item, mapIndex) => (
                  <div key={item.id ?? mapIndex} className="col-md-6">
                    <div
                      className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                      style={{ minHeight: '250px', transition: 'transform 0.3s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      {item.type === 'photo' ? (
                        <div
                          style={{ cursor: 'pointer', height: '100%' }}
                          onClick={() => setIndex(mapIndex)} // ক্লিক করলে Lightbox ওপেন হবে
                        >
                          <img
                            src={getImageUrl(item.image_url || item.image)}
                            alt={item.title || 'Gallery Image'}
                            className="w-100 h-100 card-img-top"
                            style={{ objectFit: 'cover', minHeight: '250px' }}
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="ratio ratio-16x9 h-100" style={{ minHeight: '250px' }}>
                          <iframe
                            src={getYouTubeEmbedUrl(item.video_url)}
                            title={item.title || 'Gallery Video'}
                            allowFullScreen
                            style={{ border: 'none' }}
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="p-5 bg-white rounded-4 shadow-sm border">
                    <i
                      className="fa-regular fa-images text-muted mb-3"
                      style={{ fontSize: '3rem' }}
                    ></i>
                    <h4 className="text-muted fw-bold">
                      {t('gal_no_media', 'এই ক্যাটাগরিতে কোনো ছবি/ভিডিও পাওয়া যায়নি।')}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox index={index} open={index >= 0} close={() => setIndex(-1)} slides={photoSlides} />
    </main>
  );
};

export default Gallery;
