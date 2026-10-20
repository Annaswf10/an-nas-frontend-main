import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

const Contact = () => {
  const { t } = useTranslation();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const response = await axios.post(`${API_URL}/api/contact/send`, formData);

      if (response.data.success) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: t('swal_msg_sent'),
          text: response.data.message,
          confirmButtonColor: '#006a4e',
        });

        // Clear form fields
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact Error:', error);

      
      if (error.response && error.response.status === 429) {
        Swal.fire({
          icon: 'warning',
          title: 'লিমিট শেষ!',
          text: error.response.data.message,
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: t('swal_error_title'),
          text: t('swal_msg_failed'),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Header Section */}
      <header
        className="page-header d-flex align-items-center"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.85), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
          height: '300px',
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">{t('contact_header_title')}</h1>
          <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
            {t('contact_header_sub')}
          </p>
        </div>
      </header>

      {/* Contact Info & Form Section */}
      <section className="py-5 bg-light-alt theme-bg-alt">
        <div className="container py-4">
          <div className="row g-5">
            {/* Contact Information Cards */}
            <div className="col-lg-5">
              <h2 className="fw-bold theme-text mb-4">{t('contact_info_title')}</h2>
              <p className="theme-text-muted mb-5">{t('contact_info_desc')}</p>

              <div className="contact-info-card d-flex align-items-center mb-4 p-3 rounded-3 theme-card shadow-sm border-0">
                <div
                  className="icon-wrapper bg-light text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '50px', height: '50px', fontSize: '20px' }}
                >
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h5 className="fw-bold theme-text mb-1">{t('contact_office')}</h5>
                  <p className="theme-text-muted mb-0">{t('contact_office_addr')}</p>
                </div>
              </div>

              <div className="contact-info-card d-flex align-items-center mb-4 p-3 rounded-3 theme-card shadow-sm border-0">
                <div
                  className="icon-wrapper bg-light text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '50px', height: '50px', fontSize: '20px' }}
                >
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h5 className="fw-bold theme-text mb-1">{t('contact_phone')}</h5>
                  <p className="theme-text-muted mb-0">+880 1713990042</p>
                  <p className="theme-text-muted mb-0">+880 1818861685</p>
                  <p className="theme-text-muted mb-0">+880 1714962854</p>
                </div>
              </div>

              <div className="contact-info-card d-flex align-items-center mb-4 p-3 rounded-3 theme-card shadow-sm border-0">
                <div
                  className="icon-wrapper bg-light text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '50px', height: '50px', fontSize: '20px' }}
                >
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h5 className="fw-bold theme-text mb-1">{t('contact_email')}</h5>
                  <p className="theme-text-muted mb-0">info.annaswelfarefoundation@gmail.com</p>
                </div>
              </div>

              <h5 className="fw-bold theme-text mt-5 mb-3">{t('contact_social')}</h5>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/share/1BoH6pn7P5" className="social-icon-btn">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/annas-welfare-foundation"
                  className="social-icon-btn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon-btn">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="social-icon-btn">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="social-icon-btn">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card theme-card border-0 shadow-lg p-4 p-md-5 rounded-4 h-100">
                <h3 className="fw-bold theme-text mb-4">{t('contact_form_title')}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control theme-input py-3"
                        required
                        placeholder={t('form_your_name')}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control theme-input py-3"
                        required
                        placeholder={t('form_your_phone')}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control theme-input py-3"
                        required
                        placeholder={t('form_your_email')}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control theme-input py-3"
                        required
                        placeholder={t('form_subject')}
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control theme-input py-3"
                        rows="5"
                        required
                        placeholder={t('form_message')}
                      ></textarea>
                    </div>
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary-custom w-100 py-3 fs-5 fw-bold"
                        disabled={loading}
                      >
                        {loading ? t('btn_sending') : t('btn_send_msg')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="map-section">
        <iframe
          src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          style={{ border: 0, marginBottom: '-10px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
};

export default Contact;
