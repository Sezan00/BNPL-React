import axios from 'axios';
import React, { useState } from 'react';
import { Smartphone, Banknote, ArrowRight, ShieldCheck } from 'lucide-react';

export const PayNow = () => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8000/api/send-payment', {
                phone: phone,
                amount: amount
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
            alert('Payment Success: ' + res.data.message);
            setPhone('');
            setAmount('');
        } catch (err) {
            console.error(err.response?.data);
            alert('Payment Failed! Check console for details.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 font-sans text-slate-900">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-10 border border-slate-100">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
                        <ShieldCheck className="text-indigo-600 w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Send Payment</h2>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Safe • Fast • Secure</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-8">

                    {/* Input Group: Phone */}
                    <div className="relative">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">
                            Phone Number
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Smartphone size={18} />
                            </div>
                            <input
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                placeholder="01XXX XXXXXX"
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-semibold"
                            />
                        </div>
                    </div>

                    {/* Input Group: Amount */}
                    <div className="relative">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">
                            Amount (BDT)
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Banknote size={18} />
                            </div>
                            <input
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                placeholder="0.00"
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-bold text-xl"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-slate-900 text-white rounded-2xl py-4.5 font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 active:scale-95 disabled:bg-slate-300"
                    >
                        {loading ? (
                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <span>Pay Now</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Footer */}
                <div className="mt-10 text-center">
                    <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
                        Authorized Transaction Only
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PayNow;