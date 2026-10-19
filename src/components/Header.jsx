import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo.png';
import { useTranslation } from 'react-i18next'; // ট্রান্সলেশন ইম্পোর্ট করা হলো

const Header = () => {
    // ট্রান্সলেশন ব্যবহার করার জন্য হুক
    const { t, i18n } = useTranslation();

    const closeMobileMenu = () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    };

    // ভাষা পরিবর্তন করার রিয়েল লজিক
    const handleLanguageToggle = () => {
        const newLang = i18n.language === 'en' ? 'bn' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
            <div className="container">
                <Link className="navbar-brand custom-brand align-items-center" to="/" onClick={closeMobileMenu}>
                    <img className="nav-logo" src={logo} alt="Logo" title="AN-NAS Welfare Foundation" />
                    <div className="brand-text-container d-flex flex-column justify-content-center"></div>
                </Link>

                <button className="navbar-toggler text-white border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <i className="fa-solid fa-bars fa-lg text-white"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeMobileMenu}>{t('nav_home')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" onClick={closeMobileMenu}>{t('nav_about')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/activities" onClick={closeMobileMenu}>{t('nav_activities')}</Link>
                        </li>

                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="mediaDropdown" data-bs-toggle="dropdown">{t('nav_media')}</a>
                            <ul className="dropdown-menu border-0 shadow-lg rounded-3">
                                <li>
                                    <Link className="dropdown-item py-2" to="/gallery" onClick={closeMobileMenu}>
                                        <i className="fa-regular fa-image me-2 text-secondary-custom"></i> {t('nav_gallery')}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item py-2" to="/blogs" onClick={closeMobileMenu}>
                                        <i className="fa-regular fa-newspaper text-secondary-custom me-2"></i> {t('nav_blogs')}
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="involvedDropdown" data-bs-toggle="dropdown">{t('nav_get_involved')}</a>
                            <ul className="dropdown-menu border-0 shadow-lg rounded-3">
                                <li>
                                    <Link className="dropdown-item py-2" to="/volunteer" onClick={closeMobileMenu}>
                                        <i className="fa-solid fa-hand-holding-heart me-2 text-secondary-custom"></i> {t('nav_volunteer')}
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item py-2 fw-bold text-primary-custom" to="/donation" onClick={closeMobileMenu}>
                                        <i className="fa-solid fa-circle-dollar-to-slot me-2"></i> {t('nav_donate')}
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" onClick={closeMobileMenu}>{t('nav_contact')}</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center ms-lg-3 gap-2 mt-3 mt-lg-0 pb-3 pb-lg-0">
                        {/* <button id="theme-toggle" className="btn btn-outline-light rounded-circle" onClick={closeMobileMenu}>
                            <i className="fa-solid fa-moon"></i>
                        </button> */}
                        
                        {/* ডাইনামিক ভাষা পরিবর্তনের বাটন */}
                        <button 
                            id="lang-toggle" 
                            className="btn btn-outline-light fw-bold" 
                            onClick={() => {
                                closeMobileMenu();
                                handleLanguageToggle();
                            }}
                        >
                            {t('lang_btn')}
                        </button>

                        <Link className="btn btn-donate" to="/donation" onClick={closeMobileMenu}>{t('nav_donate')}</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;