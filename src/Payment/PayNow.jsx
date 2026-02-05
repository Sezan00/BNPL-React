import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Smartphone,
    Banknote,
    ArrowRight,
    ShieldCheck,
    CalendarClock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PayNow = () => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('now');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [installmentPlans, setInstallmentPlans] = useState([]);
    const [creditLimit, setCreditLimit] = useState(0);
    const [preview, setPreview] = useState(null);


    const navigate = useNavigate();
    useEffect(() => {
        const fetchInstallments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8000/api/installment`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json'
                        }
                    }
                );
                setInstallmentPlans(res.data.installments);
                setCreditLimit(res.data.credit_limit);
                console.log('Installment', res.data.installments);
                console.log('Credit limit', res.data.credit_limit);
            } catch (error) {
                console.log('Installment fetch error:', error.response?.data || error.message);
            }
        };
        fetchInstallments();
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:8000/api/send-payment',
                { phone, amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            );

            alert('Payment Success: ' + res.data.message);
            setPhone('');
            setAmount('');
        } catch (err) {
            console.error(err.response?.data);
            alert('Payment Failed!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (amount && selectedPlan) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:8000/api/paylater/preview', {
                phone,
                amount,
                package_id: selectedPlan.id
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                }

            )
                .then(res => setPreview(res.data))
                .catch(err => console.log(err));
        }
    }, [phone, amount, selectedPlan]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 items-center justify-center bg-indigo-50 rounded-2xl mb-4">
                        <ShieldCheck className="text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold">Make Payment</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Choose instant or installment
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
                    <button
                        onClick={() => setMode('now')}
                        className={`flex-1 py-3 rounded-xl font-bold transition
                        ${mode === 'now'
                                ? 'bg-white shadow'
                                : 'text-slate-400'
                            }`}
                    >
                        Pay Now
                    </button>

                    <button
                        onClick={() => setMode('later')}
                        className={`flex-1 py-3 rounded-xl font-bold transition
                        ${mode === 'later'
                                ? 'bg-white shadow'
                                : 'text-slate-400'
                            }`}
                    >
                        Pay Later
                    </button>
                </div>

                {/* PAY NOW */}
                {mode === 'now' && (
                    <form onSubmit={handlePayment} className="space-y-6">

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">
                                Phone Number
                            </label>
                            <div className="relative mt-2">
                                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>

                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">
                                Amount
                            </label>
                            <div className="relative mt-2">
                                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    required
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 text-xl font-bold"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-600 transition"
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                            <ArrowRight size={18} />
                        </button>
                    </form>
                )}

                {/* PAY LATER */}
                {mode === 'later' && (
                    // phone number for pay later to merchant 
                    <div className="space-y-5">
                        <div>   
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase">
                                    Phone Number
                                </label>
                                <div className="relative mt-2">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12"
                                        placeholder="01XXXXXXXXX"
                                    />
                                </div>

                            </div>
                             <label className="text-xs font-bold text-slate-400 uppercase">
                                Amount
                            </label>
                            <div className="relative mt-2">
                                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    required
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-50 border-2 rounded-2xl py-4 pl-12 text-xl font-bold"
                                    placeholder="0.00"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Available Credit: <span className="font-bold">${creditLimit}</span>
                            </p>
                        </div>

                        {installmentPlans.map(plan => (

                            <div
                                key={plan.id}
                                value={selectedPlan}
                                onClick={() => setSelectedPlan(plan)}
                                className={`p-5 rounded-2xl border cursor-pointer transition
                                ${selectedPlan?.id === plan.id
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-slate-200 hover:border-indigo-300'
                                    }`}
                            >

                                <div className="flex items-center gap-3">
                                    <CalendarClock className="text-indigo-600" />
                                    <h3 className="font-bold">{plan.name}</h3>
                                </div>

                                <p className="text-sm text-slate-500 mt-2">
                                    {plan.installment_count} installments • {plan.interest_percent}% interest
                                </p>
                            </div>
                        ))}
                        {preview && (
                            <div className="mt-5 p-5 border rounded bg-gray-50">
                                <p><strong>Bussiness Name:</strong> {preview.merchant.merchant_name}</p>
                                <p><strong>Package:</strong> {preview.package_name}</p>
                                <p><strong>Interest:</strong> ${preview.interest}</p>
                                <p><strong>Total Payable:</strong> ${preview.total_payable}</p>
                                <p><strong>Installments:</strong></p>
                                <ul className="list-disc ml-5">
                                    {preview.installments.map(i => (
                                        <li key={i.installment_no}>
                                            #{i.installment_no}: ${i.amount} due {i.due_date}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            disabled={!selectedPlan}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold disabled:bg-slate-300"
                            onClick={() => {
                                navigate('/payment-summary', {
                                    state: {
                                        amount,
                                        phone,
                                        plan: selectedPlan,
                                        preview
                                    }
                                })
                            }}
                        >
                            Continue with Installment
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PayNow;
