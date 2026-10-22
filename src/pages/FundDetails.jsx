import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';
import './FundDetails.css';

// ------------------------------------------------------------
// সংস্থার পেমেন্ট তথ্য (হাতে টাকা পাঠানোর জন্য)
// ------------------------------------------------------------
const MOBILE_NUMBER = '01713990042';
const BANK = {
    bank: 'Shahjalal Islami Bank PLC',
    name: 'AN-NAS Welfare Foundation',
    account: '401913100000201',
    branch: 'Pragati Sarani Branch',
    routing: '19026718',
    swift: 'SJBLBDDH',
};

// প্রতিটা ফান্ডের জন্য দ্রুত বেছে নেওয়ার পরিমাণ
const PRESETS = {
    zakat: [1000, 2500, 5000, 10000, 25000, 50000],
    general: [300, 500, 1000, 2000, 3000, 5000],
    general_daily: [10, 20, 30, 50, 100, 200],
    iftar: [100, 300, 500, 1000, 2000, 5000],
    default: [500, 1000, 2000, 5000, 10000, 25000],
};

// Online পেমেন্টের পদ্ধতি (SSLCommerz-এর পেজে সরাসরি এটাই খুলবে)
const ONLINE_METHODS = [
    { key: 'bkash', logo: 'bKash', label: 'bKash', color: '#e2136e' },
    { key: 'nagad', logo: 'Nagad', label: 'Nagad', color: '#ec1c24' },
    { key: 'rocket', logo: 'Rocket', label: 'Rocket', color: '#8c3494' },
    { key: 'card', icon: 'fa-regular fa-credit-card', labelKey: 'fdx_m_card', color: '#1a5fb4' },
    { key: 'netbank', icon: 'fa-solid fa-building-columns', labelKey: 'fdx_m_netbank', color: '#006a4e' },
    { key: 'all', icon: 'fa-solid fa-ellipsis', labelKey: 'fdx_m_other', color: '#6c7f77' },
];

const ONLINE_MIN = 10;      // SSLCommerz-এর সর্বনিম্ন
const ONLINE_MAX = 500000;  // SSLCommerz-এর সর্বোচ্চ (এক লেনদেনে)

const isValidContact = (value) => {
    const v = value.trim();
    if (v.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const digits = v.replace(/[\s-]/g, '');
    return /^(\+?88)?01[3-9]\d{8}$/.test(digits);
};

const formatTaka = (value) => Number(value || 0).toLocaleString('en-IN');

const FundDetails = () => {
    const { t, i18n } = useTranslation();
    const { fundName } = useParams();

    // ডাটাবেস থেকে ট্রান্সলেশন অনুযায়ী ডাটা নেওয়া হলো
    const fundsData = t('funds_data', { returnObjects: true });

    // ভিডিওগুলোর লিস্ট
    const fundVideos = {
        zakat: 'https://www.youtube.com/embed/-zhcl889KJ8?',
        general: 'https://www.youtube.com/embed/tkSyVhNbkcM?',
        qurbani: 'https://www.youtube.com/embed/kAetRy_INFU?',
        iftar: 'https://www.youtube.com/embed/XXXXX',
        education: 'https://www.youtube.com/embed/XXXXX',
        'self-reliance': 'https://www.youtube.com/embed/XXXXX',
        disaster: 'https://www.youtube.com/embed/XXXXX',
        winter: 'https://www.youtube.com/embed/XXXXX',
        environment: 'https://www.youtube.com/embed/XXXXX',
        medical: 'https://www.youtube.com/embed/XXXXX'
    };

    const fundKey = fundsData[fundName] ? fundName : 'zakat';
    const currentFund = fundsData[fundKey];
    // আসল ভিডিও না থাকলে (XXXXX) ভিডিওর জায়গা দেখানো হবে না
    const currentVideo = fundVideos[fundKey]?.includes('XXXXX') ? null : fundVideos[fundKey];

    // Database-এ সবসময় ইংরেজি নাম রাখা হয়, যাতে বাংলা/ইংরেজি দুই ভাষার দান একই ফান্ডে গোনা হয়
    const fundTitleEn = i18n.getFixedT('en')('funds_data', { returnObjects: true })?.[fundKey]?.title || currentFund.title;

    const isRegularDonation = fundKey === 'general';
    const isZakat = fundKey === 'zakat';

    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [manualMethod, setManualMethod] = useState('bkash'); // 'bkash' | 'nagad' | 'bank'
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Online payment (SSLCommerz): সার্ভারে চালু থাকলে তবেই অপশন দেখাবে।
    // Sandbox (test) অবস্থায় শুধু ?paytest=1 দিয়ে খুললে দেখাবে, যাতে সাধারণ দর্শক test-এ টাকা না দেন।
    const [onlineInfo, setOnlineInfo] = useState({ enabled: false, live: false });
    const [payMode, setPayMode] = useState('manual'); // 'online' | 'manual'
    const [onlineMethod, setOnlineMethod] = useState('bkash');
    const isPayTest = new URLSearchParams(window.location.search).get('paytest') === '1';
    const onlineAvailable = onlineInfo.enabled && (onlineInfo.live || isPayTest);
    const isOnline = onlineAvailable && payMode === 'online';

    useEffect(() => {
        let active = true;
        axios.get(`${API_URL}/api/payment/config`)
            .then((res) => {
                if (!active || !res.data?.enabled) return;
                setOnlineInfo({ enabled: true, live: Boolean(res.data.live) });
                if (res.data.live || isPayTest) setPayMode('online');
            })
            .catch(() => { /* online payment বন্ধ থাকলে শুধু হাতে পাঠানোর পদ্ধতি থাকবে */ });
        return () => { active = false; };
    }, [isPayTest]);

    // অন্য ফান্ডে গেলে ফর্ম নতুন করে শুরু
    useEffect(() => {
        setAmount('');
        setErrors({});
    }, [fundKey]);

    const [copiedText, setCopiedText] = useState('');

    const [cash, setCash] = useState('');
    const [goldSilver, setGoldSilver] = useState('');
    const [investments, setInvestments] = useState('');
    const [businessStock, setBusinessStock] = useState('');
    const [receivables, setReceivables] = useState('');
    const [debts, setDebts] = useState('');

    const totalAssets = (Number(cash) || 0) + (Number(goldSilver) || 0) + (Number(investments) || 0) + (Number(businessStock) || 0) + (Number(receivables) || 0);
    const netWealth = totalAssets - (Number(debts) || 0);
    const calculatedZakat = netWealth > 0 ? (netWealth * 0.025).toFixed(0) : 0;

    const presets = isRegularDonation
        ? (frequency === 'daily' ? PRESETS.general_daily : PRESETS.general)
        : (PRESETS[fundKey] || PRESETS.default);

    const numericAmount = Number(amount) || 0;

    const handleCopy = (text, type) => {
        navigator.clipboard?.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(''), 2500);
    };

    const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: undefined }));

    const validate = () => {
        const next = {};
        if (!numericAmount || numericAmount <= 0) next.amount = t('fdx_err_amount');
        else if (isOnline && numericAmount < ONLINE_MIN) next.amount = t('pay_min_amount');
        else if (isOnline && numericAmount > ONLINE_MAX) next.amount = t('fdx_err_amount_max');
        if (!name.trim()) next.name = t('fdx_err_name');
        if (!isValidContact(emailOrPhone)) next.contact = t('fdx_err_contact');
        if (!isOnline && transactionId.trim().length < 4) next.trx = t('fdx_err_trx');
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleOnlinePay = async () => {
        setSubmitting(true);
        Swal.fire({
            title: t('pay_redirecting'),
            text: t('swal_wait'),
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            const response = await axios.post(`${API_URL}/api/payment/init`, {
                donor_name: name.trim(),
                contact: emailOrPhone.trim(),
                amount: numericAmount,
                fund_name: fundTitleEn,
                method: onlineMethod,
            });
            const url = response.data?.url || '';
            // শুধু SSLCommerz-এর ঠিকানায় পাঠানো হবে
            if (response.data?.success && /^https:\/\/([a-z0-9-]+\.)*sslcommerz\.com\//i.test(url)) {
                window.location.href = url;
                return; // পেজ বদলে যাচ্ছে, তাই submitting চালু থাকুক
            }
            throw new Error('Invalid gateway URL');
        } catch (error) {
            console.error('Payment Error:', error);
            Swal.fire({
                icon: 'error',
                title: t('swal_err_title2'),
                text: error.response?.data?.message || t('pay_gateway_error'),
                confirmButtonColor: '#d33'
            });
            setSubmitting(false);
        }
    };

    const handleManualSubmit = async () => {
        const methodLabel = { bkash: 'bKash', nagad: 'Nagad', bank: 'Bank Transfer' }[manualMethod];
        const donationData = {
            donor_name: name.trim(),
            phone: emailOrPhone.trim(),
            email: emailOrPhone.includes('@') ? emailOrPhone.trim() : '',
            amount: numericAmount,
            fund_name: fundTitleEn,
            payment_method: methodLabel,
            transaction_id: transactionId.trim(),
        };

        setSubmitting(true);
        Swal.fire({
            title: t('swal_processing'),
            text: t('swal_wait'),
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            const response = await axios.post(`${API_URL}/api/donations/submit`, donationData);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: t('swal_success_title2'),
                    text: t('swal_success_msg'),
                    confirmButtonColor: '#006a4e'
                });
                setAmount('');
                setName('');
                setEmailOrPhone('');
                setTransactionId('');
                setErrors({});
            }
        } catch (error) {
            console.error('API Error:', error);
            Swal.fire({
                icon: 'error',
                title: t('swal_err_title2'),
                text: error.response?.data?.message || t('swal_err_msg'),
                confirmButtonColor: '#d33'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting || !validate()) return;
        if (isOnline) await handleOnlinePay();
        else await handleManualSubmit();
    };

    const applyZakatAmount = () => {
        if(calculatedZakat > 0) {
            setAmount(calculatedZakat);
            clearError('amount');
            const modalElement = document.getElementById('zakatCalculatorModal');
            const modalInstance = window.bootstrap?.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        }
    };

    const selectedMethod = ONLINE_METHODS.find((m) => m.key === onlineMethod);
    const methodLabel = selectedMethod?.key === 'all' ? 'SSLCommerz' : (selectedMethod?.label || t(selectedMethod?.labelKey || 'fdx_m_card'));

    const submitLabel = numericAmount > 0
        ? (isOnline ? t('fdx_btn_pay', { amount: formatTaka(numericAmount), method: methodLabel }) : t('fdx_btn_submit', { amount: formatTaka(numericAmount) }))
        : (isOnline ? t('pay_now_btn') : t('fdx_btn_submit_plain'));

    return (
        <main className="bg-white pb-5">
            <div className="container pt-5 pb-4 text-center">
                <h1 className="fw-bold theme-text display-5" style={{ color: '#006a4e' }}>{currentFund.title}</h1>
                <p className="text-muted">{t('fd_subtitle')}</p>
            </div>

            <div className="container">
                <div className="row g-4 g-lg-5">
                    
                    {/* Left Column */}
                    <div className="col-lg-7 order-last order-lg-first">
                        {currentVideo && (
                        <div className="ratio ratio-16x9 mb-4 rounded-4 overflow-hidden shadow-sm border">
                            <iframe 
                                src={currentVideo} 
                                title={`${currentFund.title} Video`} 
                                allowFullScreen>
                            </iframe>
                        </div>
                        )}

                        <div className="p-4 rounded-4 mb-4 text-center" style={{ backgroundColor: '#eefcf5', border: '1px solid #d1f0e1' }}>
                            <p className="fw-bold theme-text fs-5 mb-2">{currentFund.quote}</p>
                            <p className="text-muted mb-0 fw-semibold">{currentFund.source}</p>
                        </div>

                        <div className="theme-text mb-4" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                            <p>{currentFund.desc}</p>
                        </div>

                        <div className="p-4 p-md-5 rounded-4 mt-4" style={{ backgroundColor: '#f4f6f5' }}>
                            <h4 className="fw-bold mb-4" style={{ color: '#1a412c' }}>
                                {isRegularDonation ? t('fd_sectors_regular') : t('fd_sectors_other')}
                            </h4>
                            <ul className="list-unstyled mb-0">
                                {currentFund.sectors?.map((sector, index) => (
                                    <li key={index} className="d-flex mb-3 align-items-start">
                                        <i className="fa-solid fa-circle-check text-success fs-5 me-3 mt-1"></i>
                                        <span className="fs-5 text-dark">{sector}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Donation Form) */}
                    <div className="col-lg-5 order-first order-lg-last">
                        <div className="fdx-card shadow-sm mb-4">
                            <div className="fdx-head text-white text-center">
                                <h4 className="fw-bold mb-1">{currentFund.ctaTitle}</h4>
                                <p className="mb-0 small" style={{ opacity: 0.9 }}>{currentFund.ctaDesc}</p>
                                {isZakat && (
                                    <button type="button" className="btn btn-light btn-sm text-success fw-bold rounded-pill px-3 mt-3" data-bs-toggle="modal" data-bs-target="#zakatCalculatorModal">
                                        <i className="fa-solid fa-calculator me-2"></i>{t('fd_btn_zakat_calc')}
                                    </button>
                                )}
                            </div>

                            <form className="p-3 p-md-4" onSubmit={handleSubmit} noValidate>
                                {/* ধাপ ১: পরিমাণ */}
                                <div className="fdx-step-title"><span>1</span>{t('fdx_step_amount')}</div>

                                {isRegularDonation && (
                                    <div className="fdx-segment mb-3" role="group">
                                        {['daily', 'monthly'].map((f) => (
                                            <button key={f} type="button" className={frequency === f ? 'active' : ''} onClick={() => { setFrequency(f); setAmount(''); }}>
                                                {t(f === 'daily' ? 'fd_freq_daily' : 'fd_freq_monthly')}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="row g-2 mb-2">
                                    {presets.map((val) => (
                                        <div className="col-4" key={val}>
                                            <button
                                                type="button"
                                                className={`fdx-chip w-100 ${numericAmount === val ? 'active' : ''}`}
                                                onClick={() => { setAmount(String(val)); clearError('amount'); }}
                                            >
                                                ৳ {formatTaka(val)}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={`fdx-amount ${errors.amount ? 'is-invalid' : ''}`}>
                                    <span>৳</span>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        value={amount}
                                        onChange={(e) => { setAmount(e.target.value); clearError('amount'); }}
                                        placeholder={t('fdx_amount_custom')}
                                        aria-label={t('fd_amount_label')}
                                    />
                                </div>
                                {errors.amount && <div className="fdx-error">{errors.amount}</div>}

                                {/* ধাপ ২: দাতার তথ্য */}
                                <div className="fdx-step-title mt-4"><span>2</span>{t('fdx_step_details')}</div>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold mb-1" htmlFor="fdx-name">{t('fd_name_label')} *</label>
                                    <input id="fdx-name" type="text" className={`form-control fdx-input ${errors.name ? 'is-invalid' : ''}`} placeholder={t('fdx_name_ph')}
                                        value={name} maxLength={100} autoComplete="name"
                                        onChange={(e) => { setName(e.target.value); clearError('name'); }} />
                                    {errors.name && <div className="fdx-error">{errors.name}</div>}
                                </div>
                                <div className="mb-1">
                                    <label className="form-label small fw-semibold mb-1" htmlFor="fdx-contact">{t('fd_contact_label')}</label>
                                    <input id="fdx-contact" type="text" className={`form-control fdx-input ${errors.contact ? 'is-invalid' : ''}`} placeholder={t('fdx_contact_ph')}
                                        value={emailOrPhone} maxLength={150} autoComplete="tel"
                                        onChange={(e) => { setEmailOrPhone(e.target.value); clearError('contact'); }} />
                                    {errors.contact ? <div className="fdx-error">{errors.contact}</div> : <div className="form-text small">{t('fdx_contact_hint')}</div>}
                                </div>

                                {/* ধাপ ৩: পেমেন্ট পদ্ধতি */}
                                {isOnline ? (
                                    <>
                                        <div className="fdx-step-title mt-4">
                                            <span>3</span>{t('fdx_select_method')}
                                            {!onlineInfo.live && <span className="badge bg-warning text-dark ms-2">TEST MODE</span>}
                                        </div>
                                        <div className="fdx-methods" role="radiogroup">
                                            {ONLINE_METHODS.map((m) => (
                                                <button
                                                    key={m.key}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={onlineMethod === m.key}
                                                    className={`fdx-method ${onlineMethod === m.key ? 'active' : ''}`}
                                                    onClick={() => setOnlineMethod(m.key)}
                                                >
                                                    <span className="fdx-logo" style={{ color: m.color }}>
                                                        {m.icon ? <i className={m.icon}></i> : <b>{m.logo}</b>}
                                                    </span>
                                                    {m.icon
                                                        ? <strong>{t(m.labelKey)}</strong>
                                                        : <small className="fdx-method-sub">{t('fdx_m_mobile')}</small>}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="fdx-note mt-2 mb-0">
                                            <i className="fa-solid fa-building-columns me-1"></i>{t('fdx_settle_note')}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="fdx-step-title mt-4"><span>3</span>{t('fdx_manual_heading')}</div>
                                        <div className="fdx-panel">
                                            <div className="fdx-segment fdx-segment-3 mb-3" role="group">
                                                {[['bkash', 'bKash'], ['nagad', 'Nagad'], ['bank', t('fdx_bank_short')]].map(([key, label]) => (
                                                    <button key={key} type="button" className={manualMethod === key ? 'active' : ''} onClick={() => setManualMethod(key)}>{label}</button>
                                                ))}
                                            </div>

                                            {manualMethod === 'bank' ? (
                                                <ul className="list-unstyled small mb-3 fdx-bank">
                                                    <li><span>{t('fd_bank')}</span><b>{BANK.bank}</b></li>
                                                    <li><span>{t('fd_acc_name')}</span><b>{BANK.name}</b></li>
                                                    <li>
                                                        <span>{t('fd_acc_no')}</span>
                                                        <b>
                                                            {BANK.account}
                                                            <button type="button" className="fdx-copy ms-2" onClick={() => handleCopy(BANK.account, 'acc')}>
                                                                {copiedText === 'acc' ? t('fd_copied') : t('fd_copy')}
                                                            </button>
                                                        </b>
                                                    </li>
                                                    <li><span>{t('fd_branch')}</span><b>{BANK.branch}</b></li>
                                                    <li><span>Routing:</span><b>{BANK.routing}</b></li>
                                                    <li><span>SWIFT:</span><b>{BANK.swift}</b></li>
                                                </ul>
                                            ) : (
                                                <div className="fdx-number mb-3">
                                                    <div>
                                                        <small className="text-muted d-block">{t('fdx_send_money_to', { method: manualMethod === 'bkash' ? 'bKash' : 'Nagad' })}</small>
                                                        <strong className="fs-5">{MOBILE_NUMBER}</strong>
                                                    </div>
                                                    <button type="button" className="fdx-copy" onClick={() => handleCopy(MOBILE_NUMBER, 'mobile')}>
                                                        <i className="fa-regular fa-copy me-1"></i>{copiedText === 'mobile' ? t('fd_copied') : t('fd_copy')}
                                                    </button>
                                                </div>
                                            )}

                                            <ol className="small text-muted ps-3 mb-3">
                                                <li>{t(manualMethod === 'bank' ? 'fdx_manual_step1_bank' : 'fdx_manual_step1', { amount: numericAmount > 0 ? `৳ ${formatTaka(numericAmount)}` : t('fdx_the_amount') })}</li>
                                                <li>{t('fdx_manual_step2')}</li>
                                            </ol>

                                            <label className="form-label small fw-semibold mb-1" htmlFor="fdx-trx">{t('fdx_trx_label')}</label>
                                            <input id="fdx-trx" type="text" className={`form-control fdx-input ${errors.trx ? 'is-invalid' : ''}`} placeholder={t('fdx_trx_ph')}
                                                value={transactionId} maxLength={100} autoComplete="off"
                                                onChange={(e) => { setTransactionId(e.target.value); clearError('trx'); }} />
                                            {errors.trx && <div className="fdx-error">{errors.trx}</div>}
                                        </div>
                                    </>
                                )}

                                {numericAmount > 0 && (
                                    <div className="fdx-summary mt-3">
                                        <span>{currentFund.title}</span>
                                        <strong>৳ {formatTaka(numericAmount)}</strong>
                                    </div>
                                )}

                                <button type="submit" className="btn fdx-submit w-100 mt-3" disabled={submitting}>
                                    {submitting
                                        ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        : <i className={`fa-solid ${isOnline ? 'fa-lock' : 'fa-paper-plane'} me-2`}></i>}
                                    {submitLabel}
                                </button>

                                <div className="fdx-trust mt-3">
                                    <span><i className="fa-solid fa-shield-halved"></i>{isOnline ? t('fdx_trust_ssl') : t('fdx_trust_verify')}</span>
                                    <span><i className="fa-solid fa-building-ngo"></i>{t('fdx_trust_ngo')}</span>
                                </div>

                                {/* হাতে আগেই টাকা পাঠিয়ে থাকলে TrxID দেওয়ার পথ (online-এর পাশে ছোট করে) */}
                                {onlineAvailable && (
                                    <div className="fdx-switch mt-3">
                                        {isOnline ? (
                                            <button type="button" onClick={() => setPayMode('manual')}>
                                                <i className="fa-solid fa-receipt me-1"></i>{t('fdx_switch_manual')}
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => { setPayMode('online'); clearError('trx'); }}>
                                                <i className="fa-solid fa-arrow-left me-1"></i>{t('fdx_switch_online')}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extended Zakat Calculator Modal (No changes made here) */}
            <div className="modal fade" id="zakatCalculatorModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                            <h4 className="modal-title fw-bold text-success"><i className="fa-solid fa-calculator me-2"></i> {t('fd_zakat_calc_title')}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="alert alert-success bg-opacity-10 border-success border-opacity-25 rounded-3 mb-4">
                                <i className="fa-solid fa-circle-info me-2 text-success"></i>
                                {t('fd_zakat_note')}
                            </div>
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <h5 className="fw-bold text-success mb-3 border-bottom pb-2">{t('fd_zakat_assets')}</h5>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_cash')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light">৳</span><input type="number" className="form-control" value={cash} onChange={(e) => setCash(e.target.value)} placeholder="0" /></div></div>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_gold')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light">৳</span><input type="number" className="form-control" value={goldSilver} onChange={(e) => setGoldSilver(e.target.value)} placeholder="0" /></div></div>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_investments')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light">৳</span><input type="number" className="form-control" value={investments} onChange={(e) => setInvestments(e.target.value)} placeholder="0" /></div></div>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_stock')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light">৳</span><input type="number" className="form-control" value={businessStock} onChange={(e) => setBusinessStock(e.target.value)} placeholder="0" /></div></div>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_receivables')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light">৳</span><input type="number" className="form-control" value={receivables} onChange={(e) => setReceivables(e.target.value)} placeholder="0" /></div></div>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="fw-bold text-danger mb-3 border-bottom pb-2">{t('fd_liabilities')}</h5>
                                    <div className="mb-3"><label className="form-label fw-semibold text-dark small mb-1">{t('fd_debts')}</label><div className="input-group input-group-sm"><span className="input-group-text bg-light border-danger text-danger">৳</span><input type="number" className="form-control border-danger" value={debts} onChange={(e) => setDebts(e.target.value)} placeholder="0" /></div></div>
                                    <div className="mt-5 p-3 bg-light rounded-3 text-center border">
                                        <p className="mb-1 text-muted fw-bold">{t('fd_payable')}</p>
                                        <h2 className="fw-bold text-success mb-0">৳ {calculatedZakat}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 px-4 pb-4">
                            <button type="button" className="btn btn-light fw-bold" data-bs-dismiss="modal">{t('fd_cancel')}</button>
                            <button type="button" className="btn btn-success fw-bold px-4" onClick={applyZakatAmount} disabled={calculatedZakat <= 0}>{t('fd_donate_this')}</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default FundDetails;