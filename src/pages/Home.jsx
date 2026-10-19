import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import qurbaniImg from "../assets/image/Qurbani-for-All.png";
import selfRelianceImg from "../assets/image/Self-Reliance-Fund.png";
import disasterImg from "../assets/image/Emergency-Disaster.png";
import winterImg from "../assets/image/Winter-Relief.png";

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * end), end);
      
      setCount(currentCount);
      
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
};
const Home = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/activities");
        const result = await response.json();
        if (result.data || result.activities) {
          const data = result.data || result.activities;
          setActivities(Array.isArray(data) ? data.slice(0, 3) : []);
        } else if (Array.isArray(result)) {
          setActivities(result.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const result = await response.json();
        if (result.success && result.data) {
          setNews(result.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchActivities();
    fetchNews();
  }, []);

  const getImageUrl = (imagePath, fallback) => {
    if (!imagePath) return fallback;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("uploads/"))
      return `http://localhost:5000/${imagePath}`;
    if (imagePath.startsWith("uploads\\"))
      return `http://localhost:5000/${imagePath.replace("\\", "/")}`;
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  return (
    <main>
      <header
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-pause="false"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <div
              className="slide-image"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 106, 78, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <div className="container text-center" data-aos="zoom-in">
                <h1 className="display-3 fw-bold text-white mb-4">{t('hero_title_1')}</h1>
                <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                  {t('hero_desc_1')}
                </p>
                <div className="hero-buttons">
                  <Link
                    to="/donation"
                    className="btn btn-success btn-lg me-md-3 px-4 py-2 hover-scale"
                    style={{
                      backgroundColor: '#006a4e',
                      border: 'none',
                      transition: 'transform 0.3s',
                    }}
                  >
                    {t('btn_donate_now')}
                  </Link>
                  <Link
                    to="/volunteer"
                    className="btn btn-outline-light btn-lg px-4 py-2 mt-3 mt-md-0 hover-scale"
                    style={{ transition: 'transform 0.3s' }}
                  >
                    {t('btn_join_us')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <div
              className="slide-image"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 106, 78, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <div className="container text-center" data-aos="zoom-in">
                <h1 className="display-3 fw-bold text-white mb-4">{t('hero_title_2')}</h1>
                <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                  {t('hero_desc_2')}
                </p>
                <div className="hero-buttons">
                  <Link
                    to="/activities"
                    className="btn btn-success btn-lg px-4 py-2 hover-scale"
                    style={{
                      backgroundColor: '#006a4e',
                      border: 'none',
                      transition: 'transform 0.3s',
                    }}
                  >
                    {t('btn_our_work')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </header>

      {/* Statistics Banner Section */}
      <section
        className="py-4 theme-bg position-relative"
        style={{ backgroundColor: '#006a4e', zIndex: 10 }}
      >
        <div className="container" data-aos="fade-up">
          <div
            className="stats-banner shadow-lg p-4 rounded-4 bg-white bg-opacity-10"
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          >
            <div className="row text-center g-4 align-items-center">
              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1 display-6">
                  ৳<AnimatedCounter end={50} duration={2500} />
                  L+
                </h2>
                <p className="stats-label mb-0 text-light" style={{ opacity: '0.9' }}>
                  {t('stat_1')}
                </p>
              </div>

              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1 display-6">
                  <AnimatedCounter end={300} duration={2000} />K
                </h2>
                <p className="stats-label mb-0 text-light" style={{ opacity: '0.9' }}>
                  {t('stat_2')}
                </p>
              </div>

              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1 display-6">
                  <AnimatedCounter end={1} duration={1500} />
                  M+
                </h2>
                <p className="stats-label mb-0 text-light" style={{ opacity: '0.9' }}>
                  {t('stat_3')}
                </p>
              </div>

              <div className="col-6 col-md-3">
                <h2 className="fw-bold text-white mb-1 display-6">
                  <AnimatedCounter end={50} duration={2500} />
                  K+
                </h2>
                <p className="stats-label mb-0 text-light" style={{ opacity: '0.9' }}>
                  {t('stat_4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-short py-5 overflow-hidden">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="About Us"
                className="img-fluid rounded-4 shadow-lg hover-scale"
                style={{ transition: 'transform 0.5s' }}
              />
            </div>
            <div className="col-lg-6 px-lg-5" data-aos="fade-left">
              <h5 className="fw-bold" style={{ color: '#F5A623' }}>
                {t('about_subtitle')}
              </h5>
              <h2 className="mb-4 fw-bold" style={{ color: '#006a4e' }}>
                {t('about_title')}
              </h2>
              <p className="text-muted">{t('about_p1')}</p>
              <p className="text-muted">{t('about_p2')}</p>
              <Link
                to="/about"
                className="btn btn-success px-4 py-2 mt-3 hover-scale"
                style={{
                  backgroundColor: '#006a4e',
                  border: 'none',
                  transition: 'transform 0.3s',
                }}
              >
                {t('btn_read_more')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="services-section py-5 position-relative"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.9), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover fixed",
        }}
      >
        <div className="container py-5 position-relative z-1">
          <div className="text-center mb-5" data-aos="fade-up">
            <h5 className="text-warning fw-bold">{t('services_subtitle')}</h5>
            <h2 className="text-white fw-bold">{t('services_title')}</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="100">
              <div
                className="card h-100 text-center p-4 shadow border-0 rounded-4"
                style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div className="mx-auto mb-3 text-success fs-1">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h4 className="fw-bold" style={{ color: '#006a4e' }}>
                  {t('service_edu_title')}
                </h4>
                <p className="text-muted small mb-0">{t('service_edu_desc')}</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
              <div
                className="card h-100 text-center p-4 shadow border-0 rounded-4"
                style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div className="mx-auto mb-3 text-success fs-1">
                  <i className="fa-solid fa-notes-medical"></i>
                </div>
                <h4 className="fw-bold" style={{ color: '#006a4e' }}>
                  {t('service_med_title')}
                </h4>
                <p className="text-muted small mb-0">{t('service_med_desc')}</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
              <div
                className="card h-100 text-center p-4 shadow border-0 rounded-4"
                style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div className="mx-auto mb-3 text-success fs-1">
                  <i className="fa-solid fa-bowl-rice"></i>
                </div>
                <h4 className="fw-bold" style={{ color: '#006a4e' }}>
                  {t('service_food_title')}
                </h4>
                <p className="text-muted small mb-0">{t('service_food_desc')}</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="400">
              <div
                className="card h-100 text-center p-4 shadow border-0 rounded-4"
                style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div className="mx-auto mb-3 text-success fs-1">
                  <i className="fa-solid fa-house-chimney-crack"></i>
                </div>
                <h4 className="fw-bold" style={{ color: '#006a4e' }}>
                  {t('service_disaster_title')}
                </h4>
                <p className="text-muted small mb-0">{t('service_disaster_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#fdfbf7' }}>
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold" style={{ fontSize: '2.5rem', color: '#006a4e' }}>
              {t('funds_title')}
            </h2>
            <p className="text-muted mt-2">{t('funds_subtitle')}</p>
            <div
              className="mx-auto mt-2"
              style={{
                height: '3px',
                width: '80px',
                backgroundColor: '#006a4e',
              }}
            ></div>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              className="pb-5"
              style={{
                '--swiper-navigation-color': '#006a4e',
                '--swiper-pagination-color': '#006a4e',
                padding: '10px',
              }}
            >
              <SwiperSlide>
                <div
                  className="card h-100 shadow border-0 rounded-4 overflow-hidden mb-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Zakat Fund"
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <h4 className="fw-bold mb-3" style={{ color: '#006a4e' }}>
                      {t('fund_zakat_title')}
                    </h4>
                    <p className="text-muted mb-4 small">{t('fund_zakat_desc')}</p>
                    <Link
                      to="/fund/zakat"
                      className="btn btn-success w-100 py-2 fw-bold mt-auto rounded-3"
                    >
                      {t('btn_donate_now')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="card h-100 shadow border-0 rounded-4 overflow-hidden mb-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Regular Donation"
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <h4 className="fw-bold mb-3" style={{ color: '#006a4e' }}>
                      {t('fund_regular_title')}
                    </h4>
                    <p className="text-muted mb-4 small">{t('fund_regular_desc')}</p>
                    <Link
                      to="/fund/general"
                      className="btn btn-success w-100 py-2 fw-bold mt-auto rounded-3"
                    >
                      {t('btn_donate_now')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="card h-100 shadow border-0 rounded-4 overflow-hidden mb-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <img
                    src={selfRelianceImg}
                    alt="Self Reliance"
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <h4 className="fw-bold mb-3" style={{ color: '#006a4e' }}>
                      {t('fund_self_title')}
                    </h4>
                    <p className="text-muted mb-4 small">{t('fund_self_desc')}</p>
                    <Link
                      to="/fund/self-reliance"
                      className="btn btn-success w-100 py-2 fw-bold mt-auto rounded-3"
                    >
                      {t('btn_donate_now')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="card h-100 shadow border-0 rounded-4 overflow-hidden mb-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <img
                    src={disasterImg}
                    alt="Emergency Relief"
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <h4 className="fw-bold mb-3" style={{ color: '#006a4e' }}>
                      {t('fund_emergency_title')}
                    </h4>
                    <p className="text-muted mb-4 small">{t('fund_emergency_desc')}</p>
                    <Link
                      to="/fund/disaster"
                      className="btn btn-success w-100 py-2 fw-bold mt-auto rounded-3"
                    >
                      {t('btn_donate_now')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="text-center mt-2" data-aos="fade-up">
            <Link
              to="/donation"
              className="btn btn-outline-success px-5 py-2 fw-bold rounded-pill hover-scale"
              style={{ transition: 'transform 0.3s' }}
            >
              {t('btn_view_all_funds')} <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white overflow-hidden">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div data-aos="fade-right">
              <h2 className="fw-bold" style={{ color: '#006a4e' }}>
                {t('activities_title')}
              </h2>
              <div
                className="mt-2"
                style={{
                  height: '3px',
                  width: '80px',
                  backgroundColor: '#F5A623',
                }}
              ></div>
            </div>
            <div data-aos="fade-left">
              <Link
                to="/activities"
                className="btn btn-success px-4 py-2 rounded-pill d-none d-md-block hover-scale"
                style={{ transition: 'transform 0.3s' }}
              >
                {t('btn_see_all')} <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="col-md-6 col-lg-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
                  style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div className="position-relative">
                    <img
                      src={getImageUrl(
                        activity.image || activity.img,
                        'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      )}
                      alt={activity.title}
                      className="card-img-top"
                      style={{ height: '220px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div
                      className="position-absolute top-0 end-0 bg-success text-white px-3 py-1 m-3 rounded-pill fw-semibold shadow-sm"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {activity.date || new Date(activity.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="fw-bold mb-3" style={{ color: '#006a4e', lineHeight: '1.4' }}>
                      {activity.title}
                    </h5>
                    <div
                      className="text-muted small mb-4 flex-grow-1"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: activity.description || activity.desc,
                      }}
                    />
                    <Link
                      to="/activities"
                      className="text-success fw-bold text-decoration-none mt-auto"
                    >
                      {t('btn_read_more')} <i className="fa-solid fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 d-block d-md-none">
            <Link to="/activities" className="btn btn-success px-4 py-2 rounded-pill w-100">
              {t('btn_see_all_activities')}
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-5"
        style={{ background: 'linear-gradient(to right, #006a4e, #008b65)' }}
      >
        <div className="container py-5 text-center text-white" data-aos="zoom-in">
          <h2 className="fw-bold mb-3 display-5">{t('vol_title')}</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px', opacity: '0.9' }}>
            {t('vol_desc')}
          </p>
          <Link
            to="/volunteer"
            className="btn btn-light text-success btn-lg px-5 py-3 fw-bold rounded-pill shadow hover-scale"
            style={{ transition: 'transform 0.3s' }}
          >
            {t('btn_join_now')} <i className="fa-solid fa-hand-holding-heart ms-2"></i>
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light overflow-hidden">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold" style={{ color: '#006a4e' }}>
              {t('news_title')}
            </h2>
            <div
              className="mx-auto mt-2"
              style={{
                height: '3px',
                width: '80px',
                backgroundColor: '#006a4e',
              }}
            ></div>
          </div>

          <div className="row g-4">
            {news.map((item, index) => (
              <div
                key={item.id}
                className="col-md-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm"
                  style={{ transition: 'transform 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div className="position-relative">
                    <img
                      src={getImageUrl(
                        item.image,
                        'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      )}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 bg-warning text-dark px-3 py-1 m-3 rounded-pill fw-bold shadow-sm"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {item.author || 'News'}
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                      <i className="fa-regular fa-clock me-2"></i>
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <h5
                      className="fw-bold mb-3 flex-grow-1"
                      style={{ color: '#1a412c', lineHeight: '1.4' }}
                    >
                      {item.title}
                    </h5>
                    <Link to="/news" className="text-success fw-bold text-decoration-none mt-auto">
                      Read Article <i className="fa-solid fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5" data-aos="fade-up">
            <Link
              to="/news"
              className="btn btn-outline-success px-5 py-2 fw-bold rounded-pill hover-scale"
              style={{ transition: 'transform 0.3s' }}
            >
              {t('btn_read_all_news')} <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
