import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ট্রান্সলেশন ইম্পোর্ট করা হলো

const About = () => {
  const { t } = useTranslation(); // হুক কল করা হলো
  const [activeTab, setActiveTab] = useState('service');

  return (
    <main>
      {/* Hero Section */}
      <header
        className="about-hero-section d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.8), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
          height: '350px',
        }}
      >
        <div className="container text-center text-white pb-4">
          <h1 className="display-4 fw-bold mb-3">{t('ab_header_title')}</h1>
          <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
            {t('ab_header_sub')}
          </p>
        </div>
      </header>

      {/* About Details Section */}
      <section className="py-5 mt-4 theme-bg-alt">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 pe-lg-5 mb-5 mb-lg-0">
              <h2 className="fw-bold mb-4 theme-text">
                <span className="highlight-underline">{t('ab_title')}</span>
              </h2>
              <h5 className="fw-bold mb-3 theme-text">{t('ab_subtitle')}</h5>
              <p className="theme-text-muted mb-4">{t('ab_desc')}</p>
              <Link to="/contact" className="btn btn-primary-custom px-4 py-2 fw-bold">
                {t('ab_btn')}
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Holding Hands"
                className="img-fluid about-side-img shadow-lg rounded-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner Section */}
      <section className="py-4 theme-bg" style={{ backgroundColor: '#006a4e' }}>
        <div className="container">
          <div className="stats-banner shadow-lg p-4 rounded-4 bg-white bg-opacity-10 backdrop-blur">
            <div className="row text-center g-4">
              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1">৳50L+</h2>
                <p className="stats-label mb-0 text-light">{t('stat_1')}</p>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1">300K</h2>
                <p className="stats-label mb-0 text-light">{t('stat_2')}</p>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1">1M+</h2>
                <p className="stats-label mb-0 text-light">{t('stat_3')}</p>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1">50K+</h2>
                <p className="stats-label mb-0 text-light">{t('stat_4')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Feature Section */}
      <section className="py-5 my-4 theme-bg-alt">
        <div className="container py-4 text-center">
          <h2 className="fw-bold mb-5 theme-text">
            <span className="highlight-underline">{t('helped_title')}</span>
          </h2>

          <div className="row g-4 text-start">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="feature-box theme-card p-4 border-0 shadow-sm rounded-4 h-100 bg-white">
                <div className="icon-wrapper mb-3 text-success fs-1">
                  <i className="fa-solid fa-handshake-angle"></i>
                </div>
                <h5 className="fw-bold mb-3 theme-text">{t('feat_1_title')}</h5>
                <p className="theme-text-muted">{t('feat_1_desc')}</p>
              </div>
            </div>
            {/* Feature 2 (Active) */}
            <div className="col-md-4">
              <div
                className="feature-box active theme-card-active p-4 border-0 shadow-lg rounded-4 h-100 text-white"
                style={{ backgroundColor: '#006a4e' }}
              >
                <div className="icon-wrapper mb-3 text-warning fs-1">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h5 className="fw-bold mb-3 text-white">{t('feat_2_title')}</h5>
                <p className="text-light">{t('feat_2_desc')}</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="feature-box theme-card p-4 border-0 shadow-sm rounded-4 h-100 bg-white">
                <div className="icon-wrapper mb-3 text-success fs-1">
                  <i className="fa-solid fa-users"></i>
                </div>
                <h5 className="fw-bold mb-3 theme-text">{t('feat_3_title')}</h5>
                <p className="theme-text-muted">{t('feat_3_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approvals & Certifications Section */}
      <section className="py-5 bg-light-alt theme-bg-alt">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold theme-text">{t('cert_title')}</h2>
            <div
              className="mx-auto mt-2"
              style={{
                height: '3px',
                width: '80px',
                backgroundColor: '#006a4e',
              }}
            ></div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Certificate 1 (Image with Modal + Download Link) */}
            <div className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 rounded-4 text-center p-3"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* ক্লিক করলে বড় হওয়ার অংশ */}
                <div
                  className="overflow-hidden rounded-3 mb-3 position-relative"
                  style={{ cursor: 'pointer', border: '1px solid #eef2f1' }}
                  data-bs-toggle="modal"
                  data-bs-target="#certificateModal1"
                  title="Click to view full size"
                >
                  <img
                    src="/docs/registration-certificate.png" // আপনার আসল ছবির লিংক এখানে দেবেন
                    alt="Registration Certificate"
                    className="card-img-top img-fluid"
                    style={{
                      height: '220px',
                      objectFit: 'contain',
                      padding: '10px',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    onError={(e) => {
                      e.target.src =
                        'https://placehold.co/600x800/f8f9fa/a3a3a3?text=Registration+Certificate';
                    }}
                  />
                  {/* ছবির উপরে ছোট্ট একটি জুম আইকন */}
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-success opacity-75"
                    style={{ pointerEvents: 'none' }}
                  >
                    <i className="fa-solid fa-magnifying-glass-plus fa-2x"></i>
                  </div>
                </div>

                <div className="card-body p-0 d-flex flex-column">
                  <h5 className="fw-bold theme-text mb-4 mt-2 fs-5">{t('cert_1_name')}</h5>
                  <a
                    href="/docs/registration-certificate.pdf" // পিডিএফ ডাউনলোডের লিংক
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-100 fw-bold mt-auto d-block"
                    style={{
                      backgroundColor: '#eefcf5',
                      color: '#006a4e',
                      borderRadius: '8px',
                      padding: '10px 0',
                      textDecoration: 'none',
                    }}
                  >
                    <i className="fa-solid fa-download me-2"></i> {t('btn_download')} (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate 1 Image Modal (বড় করে দেখানোর জন্য) */}
      <div className="modal fade" id="certificateModal1" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-header border-0 pb-0 justify-content-end">
              {/* ক্লোজ বাটন */}
              <button
                type="button"
                className="btn btn-light rounded-circle shadow-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="fa-solid fa-xmark text-dark"></i>
              </button>
            </div>
            <div className="modal-body text-center p-0">
              {/* এখানেও আপনার ছবির লিংকটি দেবেন */}
              <img
                src="/docs/registration-certificate.png"
                alt="Registration Certificate Large"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  backgroundColor: '#fff',
                  padding: '15px',
                }}
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/600x800/f8f9fa/a3a3a3?text=Registration+Certificate';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Income-Expenditure Policy Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold theme-text">{t('policy_title')}</h2>
            <div
              className="mx-auto mt-2"
              style={{
                height: '3px',
                width: '80px',
                backgroundColor: '#006a4e',
              }}
            ></div>
          </div>

          {/* Tab Buttons */}
          <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-4 mb-4">
            <button
              onClick={() => setActiveTab('income')}
              className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center ${activeTab === 'income' ? 'btn-success' : 'btn-outline-success'}`}
              style={{ transition: 'all 0.3s' }}
            >
              <i className="fa-solid fa-hand-holding-dollar me-2 fs-5"></i> {t('tab_income')}
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center ${activeTab === 'service' ? 'btn-success' : 'btn-outline-success'}`}
              style={{ transition: 'all 0.3s' }}
            >
              <i className="fa-solid fa-sack-dollar me-2 fs-5"></i> {t('tab_service')}
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center ${activeTab === 'management' ? 'btn-success' : 'btn-outline-success'}`}
              style={{ transition: 'all 0.3s' }}
            >
              <i className="fa-solid fa-users-gear me-2 fs-5"></i> {t('tab_management')}
            </button>
          </div>

          {/* Tab Content Box */}
          <div
            className="card shadow-sm border-0 rounded-4 p-4 p-md-5"
            style={{ backgroundColor: '#fcfdfd', border: '1px solid #eef2f1' }}
          >
            {/* 1. Sources of Income Content */}
            {activeTab === 'income' && (
              <ul className="list-unstyled mb-0 fade-in-animation">
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('inc_1')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('inc_2')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('inc_3')}</span>
                </li>
                <li className="d-flex">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('inc_4')}</span>
                </li>
              </ul>
            )}

            {/* 2. Service Expenditure Content */}
            {activeTab === 'service' && (
              <ul className="list-unstyled mb-0 fade-in-animation">
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_1')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_2')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_3')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_4')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_5')}</span>
                </li>
                <li className="d-flex">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('srv_6')}</span>
                </li>
              </ul>
            )}

            {/* 3. Management Cost Content */}
            {activeTab === 'management' && (
              <ul className="list-unstyled mb-0 fade-in-animation">
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('mgt_1')}</span>
                </li>
                <li className="d-flex mb-4">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('mgt_2')}</span>
                </li>
                <li className="d-flex">
                  <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                  <span className="theme-text fs-5">{t('mgt_3')}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
