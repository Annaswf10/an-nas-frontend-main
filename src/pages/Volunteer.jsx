import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation, Trans } from 'react-i18next';
import { API_URL } from '../config';

const Volunteer = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('reason', formData.reason);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${API_URL}/api/volunteer/submit`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: t('swal_success_title', 'Application Submitted!'),
          text: t('swal_success_text', 'Thank you for your interest in volunteering with us.'),
          confirmButtonColor: '#006a4e',
        });

        // Clear the form
        setFormData({ name: '', phone: '', email: '', address: '', reason: '', image: null });
        const fileInput = document.getElementById('vol-image');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      console.error('Submit Error:', error);

      // Handle the 429 Limit Exceeded status
      if (error.response && error.response.status === 429) {
        Swal.fire({
          icon: 'warning',
          title: t('vol_swal_limit_title', 'Limit Reached!'),
          text: t(
            'vol_swal_limit_text',
            'Too many applications have been submitted. Please try again later.'
          ),
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: t('swal_error_title', 'Oops...'),
          text: t('vol_swal_error_text', 'Failed to submit application. Please try again.'),
          confirmButtonColor: '#006a4e',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-light pb-5 min-vh-100">
      {/* Header Section */}
      <header
        className="page-header d-flex align-items-center mb-5"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.85), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1593113514676-5fa33bea6a08?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
          height: '250px',
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold">{t('vol_header_title', 'Become a Volunteer')}</h1>
          <p className="lead mx-auto">
            {t('vol_page_sub', 'Join AN-NAS Welfare Foundation and make a difference.')}
          </p>
        </div>
      </header>

      <div className="container py-4">
        <div className="row g-5 align-items-center">
          {/* Left Side: Why Volunteer With Us */}
          <div className="col-lg-5">
            <h2 className="fw-bold mb-4" style={{ color: '#006a4e' }}>
              {t('vol_info_title', 'Why Volunteer With Us?')}
            </h2>
            <p className="text-muted mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              {/* Trans দিয়ে লেখার ভেতরের <strong> বোল্ড অংশ ঠিক থাকে */}
              <Trans i18nKey="vol_info_desc1" components={{ strong: <strong /> }} />
            </p>

            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(0, 106, 78, 0.1)',
                    color: '#006a4e',
                  }}
                >
                  <i className="fa-solid fa-hand-holding-heart fs-3"></i>
                </div>
              </div>
              <div className="ms-4">
                <h5 className="fw-bold mb-2">{t('vol_benefit_1_title', 'Impact Lives')}</h5>
                <p className="text-muted mb-0">
                  {t(
                    'vol_benefit_1_desc',
                    'Directly contribute to projects that provide education, food, and medical help.'
                  )}
                </p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(245, 166, 35, 0.1)',
                    color: '#F5A623',
                  }}
                >
                  <i className="fa-solid fa-seedling fs-3"></i>
                </div>
              </div>
              <div className="ms-4">
                <h5 className="fw-bold mb-2">{t('vol_benefit_2_title', 'Learn & Grow')}</h5>
                <p className="text-muted mb-0">
                  {t(
                    'vol_benefit_2_desc',
                    'Develop leadership skills, teamwork, and gain valuable experience.'
                  )}
                </p>
              </div>
            </div>

            <div className="d-flex">
              <div className="flex-shrink-0">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(23, 162, 184, 0.1)',
                    color: '#17a2b8',
                  }}
                >
                  <i className="fa-solid fa-users fs-3"></i>
                </div>
              </div>
              <div className="ms-4">
                <h5 className="fw-bold mb-2">{t('vol_benefit_3_title', 'Build a Network')}</h5>
                <p className="text-muted mb-0">
                  {t(
                    'vol_benefit_3_desc',
                    'Meet like-minded people who share your passion for social work.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Application Form */}
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 bg-white">
              <h3 className="fw-bold mb-4 text-center" style={{ color: '#006a4e' }}>
                {t('vol_app_form_title', 'Application Form')}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      {t('form_name', 'Full Name *')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control py-2"
                      required
                      placeholder={t('vol_ph_name', 'Enter your name')}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      {t('form_phone', 'Phone Number *')}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control py-2"
                      required
                      placeholder={t('vol_ph_phone', 'Enter phone number')}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      {t('vol_label_email', 'Email Address (Optional)')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control py-2"
                      placeholder={t('vol_ph_email', 'Enter email address')}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      {t('vol_label_image', 'Profile Picture (Optional)')}
                    </label>
                    <input
                      type="file"
                      id="vol-image"
                      name="image"
                      onChange={handleFileChange}
                      className="form-control py-2"
                      accept="image/*"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      {t('vol_label_address', 'Present Address *')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control py-2"
                      required
                      placeholder={t('vol_ph_address', 'Enter your full address')}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      {t('form_reason', 'Why do you want to join us? *')}
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="form-control"
                      rows="4"
                      required
                      placeholder={t('vol_ph_reason', 'Tell us about your motivation...')}
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4 text-center">
                    <button
                      type="submit"
                      className="btn px-5 py-3 fw-bold text-white shadow w-100"
                      style={{
                        backgroundColor: '#006a4e',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                      }}
                      disabled={loading}
                    >
                      {loading
                        ? t('vol_btn_submitting', 'Submitting Application...')
                        : t('btn_submit_app', 'Submit Application')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Volunteer;
