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


    // here is use effect post api cuz using state update api 
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
                {/* <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
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
                </div> */}

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
                           <div className="mt-8 relative overflow-hidden bg-white border border-indigo-50 rounded-4xl shadow-2xl shadow-indigo-100/50 transition-all duration-500 hover:shadow-indigo-200/50">
        
        {/* Top Accent Bar */}
        <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600" />

        <div className="p-6">
            {/* Header: Title & Status */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Payment Plan</h3>
                    <p className="text-xs font-medium text-slate-400">Review your installment details</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                    Verified Plan
                </div>
            </div>

            {/* Merchant Info Card */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 border border-slate-100">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Merchant</p>
                        <p className="font-bold text-slate-700">{preview.merchant.merchant_name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Package</p>
                    <p className="font-bold text-indigo-600">{preview.package_name}</p>
                </div>
            </div>

            {/* Financial Summary Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Interest Fee</p>
                    <p className="text-xl font-black text-slate-800">${preview.interest}</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase mb-1">Total Payable</p>
                    <p className="text-xl font-black text-white">${preview.total_payable}</p>
                </div>
            </div>

            {/* Installments Timeline */}
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                    <CalendarClock size={12} /> Payment Schedule
                </p>
                
                <div className="space-y-4 relative before:absolute before:left-3.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {preview.installments.map((i, index) => (
                        <div key={i.installment_no} className="relative pl-10 group">
                            {/* Dot on Timeline */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white bg-slate-100 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300 flex items-center justify-center z-10 shadow-sm">
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-white">
                                    {i.installment_no}
                                </span>
                            </div>
                            
                            {/* Installment Content */}
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div>
                                    <p className="text-sm font-bold text-slate-700">Installment #{i.installment_no}</p>
                                    <p className="text-[11px] font-medium text-slate-400">{i.due_date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-slate-800">${i.amount}</p>
                                    <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Due Soon</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="bg-slate-50 p-4 flex justify-center border-t border-slate-100">
            <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />
                ))}
            </div>
        </div>
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
