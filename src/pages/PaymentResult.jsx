import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

// SSLCommerz থেকে ফেরার পর দাতা এই পেজে আসেন: /donation/result?status=...&tran_id=...
// URL-এর status শুধু শুরুর অনুমান; আসল অবস্থা সার্ভার থেকে জেনে নেওয়া হয়।
const VIEW = {
    success: { icon: 'fa-circle-check', color: '#006a4e' },
    pending: { icon: 'fa-hourglass-half', color: '#d4a017' },
    failed: { icon: 'fa-circle-xmark', color: '#d33' },
    cancelled: { icon: 'fa-ban', color: '#6c757d' },
};

const fromServerStatus = (status) => {
    if (status === 'verified') return 'success';
    if (status === 'cancelled') return 'cancelled';
    if (status === 'failed' || status === 'rejected') return 'failed';
    return 'pending';
};

const PaymentResult = () => {
    const { t } = useTranslation();
    const [params] = useSearchParams();
    const tranId = params.get('tran_id') || '';
    const urlStatus = VIEW[params.get('status')] ? params.get('status') : 'pending';

    // "সফল" কেবল সার্ভার নিশ্চিত করলেই দেখানো হবে; তার আগে "যাচাই হচ্ছে"
    const [status, setStatus] = useState(urlStatus === 'success' ? 'pending' : urlStatus);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (!/^ANS[A-Z0-9]{10,40}$/.test(tranId)) return undefined;
        let active = true;
        axios.get(`${API_URL}/api/payment/status/${tranId}`)
            .then((res) => {
                if (!active || !res.data?.success) return;
                setInfo(res.data.data);
                setStatus(fromServerStatus(res.data.data.status));
            })
            .catch((err) => {
                if (active && err.response?.status === 404) setStatus('failed');
            });
        return () => { active = false; };
    }, [tranId]);

    const view = VIEW[status];

    return (
        <main className="bg-light py-5">
            <div className="container py-lg-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center">
                            <i className={`fa-solid ${view.icon} mb-3`} style={{ fontSize: '4rem', color: view.color }}></i>
                            <h2 className="fw-bold mb-3" style={{ color: view.color }}>{t(`pay_res_${status}_title`)}</h2>
                            <p className="text-muted fs-5 mb-4">{t(`pay_res_${status}_msg`)}</p>

                            {(info || tranId) && (
                                <div className="bg-light rounded-3 p-3 mb-4 text-start small">
                                    {info && (
                                        <>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">{t('pay_res_amount')}</span>
                                                <span className="fw-bold">৳ {Number(info.amount).toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="text-muted">{t('pay_res_fund')}</span>
                                                <span className="fw-bold">{info.fund_name}</span>
                                            </div>
                                        </>
                                    )}
                                    {tranId && (
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">{t('pay_res_ref')}</span>
                                            <span className="fw-semibold text-break ms-3">{tranId}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                <Link to="/" className="btn btn-outline-success rounded-pill px-4">{t('pay_res_home')}</Link>
                                <Link to="/donation" className="btn btn-success rounded-pill px-4">{t('pay_res_again')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentResult;
