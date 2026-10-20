import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

const FundDetails = () => {
    const { t } = useTranslation();
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

    const currentFund = fundsData[fundName] || fundsData['zakat'];
    const currentVideo = fundVideos[fundName] || fundVideos['zakat'];
    
    const isRegularDonation = fundName === 'general';
    const isZakat = fundName === 'zakat';

    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [transactionId, setTransactionId] = useState(''); // নতুন ট্রানজেকশন আইডি স্টেট

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
    
    const handleAmountClick = (value) => { setAmount(value); };

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopiedText(type);
        setTimeout(() => setCopiedText(''), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Node.js ব্যাকএন্ডের জন্য ডাটা সাজানো
        const donationData = {
            donor_name: name,
            phone: emailOrPhone, // Contact হিসেবে ফোন নাম্বার পাঠানো হচ্ছে
            email: '', // চাইলে ইমেইল ফিল্ড যোগ করতে পারেন
            amount: amount,
            fund_name: currentFund.title, // ডাটাবেসে ফান্ডের সুন্দর নামটি সেভ হবে
            payment_method: isRegularDonation ? paymentMethod : 'Bank Transfer',
            transaction_id: transactionId
        };

        try {
            Swal.fire({
                title: t('swal_processing'),
                text: t('swal_wait'),
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Node.js এর নতুন API তে রিকোয়েস্ট পাঠানো
            const response = await axios.post(`${API_URL}/api/donations/submit`, donationData);

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: t('swal_success_title2'),
                    text: response.data.message || t('swal_success_msg'),
                    confirmButtonColor: '#006a4e'
                });
                
                // ফর্ম ক্লিয়ার করা
                setAmount('');
                setName('');
                setEmailOrPhone('');
                setTransactionId('');
            }
        } catch (error) {
            console.error('API Error:', error);
            Swal.fire({
                icon: 'error',
                title: t('swal_err_title2'),
                text: error.response?.data?.message || t('swal_err_msg'),
                confirmButtonColor: '#d33'
            });
        }
    };
    
    const applyZakatAmount = () => {
        if(calculatedZakat > 0) {
            setAmount(calculatedZakat);
            const modalElement = document.getElementById('zakatCalculatorModal');
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        }
    };

    return (
        <main className="bg-white pb-5">
            <div className="container pt-5 pb-4 text-center">
                <h1 className="fw-bold theme-text display-5" style={{ color: '#006a4e' }}>{currentFund.title}</h1>
                <p className="text-muted">{t('fd_subtitle')}</p>
            </div>

            <div className="container">
                <div className="row g-5">
                    
                    {/* Left Column */}
                    <div className="col-lg-7">
                        <div className="ratio ratio-16x9 mb-4 rounded-4 overflow-hidden shadow-sm border">
                            <iframe 
                                src={currentVideo} 
                                title={`${currentFund.title} Video`} 
                                allowFullScreen>
                            </iframe>
                        </div>

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
                    <div className="col-lg-5">
                        <div className="p-4 rounded-top-4 text-white text-center" style={{ backgroundColor: '#008b65' }}>
                            <h4 className="fw-bold mb-2">{currentFund.ctaTitle}</h4>
                            <p className="mb-0" style={{ fontSize: '0.9rem', opacity: '0.9' }}>{currentFund.ctaDesc}</p>
                            
                            {isZakat && (
                                <button className="btn btn-light text-success fw-bold rounded-pill px-4 py-2 mt-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#zakatCalculatorModal">
                                    <i className="fa-solid fa-calculator me-2"></i> {t('fd_btn_zakat_calc')}
                                </button>
                            )}
                        </div>

                        <div className="p-4 border border-top-0 rounded-bottom-4 shadow-sm mb-4 bg-white">
                            <form onSubmit={handleSubmit}>
                                {isRegularDonation && (
                                    <div className="d-flex mb-4 rounded-2 overflow-hidden border border-success">
                                        <button type="button" className={`btn w-50 rounded-0 fw-bold py-2 ${frequency === 'daily' ? 'btn-success' : 'btn-light text-success'}`} onClick={() => setFrequency('daily')}>{t('fd_freq_daily')}</button>
                                        <button type="button" className={`btn w-50 rounded-0 fw-bold py-2 ${frequency === 'monthly' ? 'btn-success' : 'btn-light text-success'}`} onClick={() => setFrequency('monthly')}>{t('fd_freq_monthly')}</button>
                                    </div>
                                )}

                                <div className="row g-2 mb-3">
                                    {(isRegularDonation ? ['100', '50', '30', '20', '10'] : ['50000', '10000', '5000', '1000', '100']).map((val) => (
                                        <div className="col-4" key={val}>
                                            <button type="button" className={`btn w-100 fw-bold py-2 ${amount === val ? 'btn-success' : 'btn-outline-success'}`} onClick={() => handleAmountClick(val)}>৳ {val}</button>
                                        </div>
                                    ))}
                                    <div className="col-4">
                                        <button type="button" className="btn btn-outline-success w-100 fw-bold py-2" style={{ fontSize: "0.85rem" }} onClick={() => setAmount('')}>{t('fd_other_amount')}</button>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">{t('fd_amount_label')}</label>
                                    <input type="number" className="form-control bg-light py-2" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder={t('fd_amount_ph')} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">{t('fd_name_label')}</label>
                                    <input type="text" className="form-control py-2" placeholder={t('fd_name_ph')} 
                                        value={name} onChange={(e) => setName(e.target.value)} required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">{t('fd_contact_label')}</label>
                                    <input type="text" className="form-control py-2" required placeholder={t('fd_contact_ph')} 
                                        value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} 
                                    />
                                </div>

                                {isRegularDonation && (
                                    <>
                                        <div className="mb-4">
                                            <label className="form-label fw-bold text-danger">{t('fd_payment_label', 'Payment Method')}</label>
                                            <div className="d-flex gap-3 align-items-center p-3 border rounded-3 bg-light">
                                                <div className="form-check"><input className="form-check-input" type="radio" name="payment" id="bkash" checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} /><label className="form-check-label fw-bold" style={{ color: '#e2136e' }} htmlFor="bkash">bKash</label></div>
                                                <div className="form-check"><input className="form-check-input" type="radio" name="payment" id="nagad" checked={paymentMethod === 'nagad'} onChange={() => setPaymentMethod('nagad')} /><label className="form-check-label fw-bold" style={{ color: '#f7931e' }} htmlFor="nagad">Nagad</label></div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* নতুন Transaction ID ইনপুট ফিল্ড */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-success">Transaction ID (TrxID) *</label>
                                    <input type="text" className="form-control py-2 border-success" required placeholder="উদাহরণ: 8XDF9WE..." 
                                        value={transactionId} onChange={(e) => setTransactionId(e.target.value)} 
                                    />
                                    <small className="text-muted mt-1 d-block">টাকা পাঠানোর পর প্রাপ্ত TrxID টি এখানে লিখুন।</small>
                                </div>

                                <button type="submit" className="btn btn-success w-100 py-3 fw-bold fs-5 rounded-3 mt-2">
                                    {t('fd_next_step')}
                                </button>
                            </form>
                        </div>

                        {/* Payment Methods */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                                <h5 className="fw-bold text-dark" style={{ borderLeft: '4px solid #006a4e', paddingLeft: '10px' }}>{t('fd_pay_methods_title')}</h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="mb-4">
                                    <p className="fw-bold text-danger mb-2"><i className="fa-solid fa-mobile-screen-button me-2"></i>{t('fd_mobile_banking')}</p>
                                    <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                                        <div>
                                            <span className="badge bg-danger me-1">bKash</span>
                                            <span className="badge bg-warning text-dark">Nagad</span>
                                            <h6 className="fw-bold mb-0 mt-2 text-dark">01713990042</h6>
                                        </div>
                                        <button 
                                            onClick={() => handleCopy('01713990042', 'Mobile')}
                                            className="btn btn-sm btn-outline-success rounded-pill px-3 fw-bold"
                                        >
                                            {copiedText === 'Mobile' ? t('fd_copied') : t('fd_copy')}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="fw-bold text-success mb-2"><i className="fa-solid fa-building-columns me-2"></i>{t('fd_bank_acc_title')}</p>
                                    <div className="p-3 bg-light rounded-3 border">
                                        <ul className="list-unstyled mb-0 small text-dark">
                                            <li className="mb-1"><strong>{t('fd_bank')}</strong> Shahjalal Islami Bank PLC</li>
                                            <li className="mb-1"><strong>{t('fd_acc_name')}</strong> AN-NAS Welfare Foundation</li>
                                            <li className="mb-1 d-flex justify-content-between align-items-center">
                                                <span><strong>{t('fd_acc_no')}</strong> 401913100000201</span>
                                                <button 
                                                    onClick={() => handleCopy('401913100000201', 'Account')}
                                                    className="btn btn-sm btn-link text-success p-0 text-decoration-none fw-bold"
                                                >
                                                    {copiedText === 'Account' ? t('fd_copied') : t('fd_copy')}
                                                </button>
                                            </li>
                                            <li className="mb-1"><strong>{t('fd_branch')}</strong> Pragati Sarani Branch</li>
                                            <li className="mb-1"><strong>Routing:</strong> 19026718</li>
                                            <li><strong>SWIFT:</strong> SJBLBDDH</li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
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