import axios from 'axios';
import { CalendarClock, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MerchantData = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { phone } = location.state || {};

    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState('');
    const [installmentPlans, setInstallmentPlans] = useState([]);
    const [creditLimit, setCreditLimit] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(null);


    useEffect(() => {
        if (!phone) {
            setError("No phone number provided!");
            setLoading(false);
            return;
        }
        //fetch merchant data
        const fetchMerchant = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/get-merchant/${phone}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Handling Array response
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setMerchant(data);
            } catch (err) {
                setError("Failed to load merchant data.");
            } finally {
                setLoading(false);
            }
        };
        fetchMerchant();
    }, [phone]);

    //here is show instament packeges
    useEffect(() => {
        const fetchInstallments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8000/api/installment`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                });
                // Assuming res.data contains installments array and credit_limit
                setInstallmentPlans(res.data.installments || []);
                setCreditLimit(res.data.credit_limit ?? 0);

                // if(res.data.message){
                //     setError(res.data.message);
                // }
            } catch (error) {
                console.error('Installment fetch error:', error.response?.data || error.message);
            }
        };
        fetchInstallments();
    }, []);

     const handlePayNow = async (e) => {
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
            setAmount('');
        } catch (err) {
            // console.error(err.response?.data);
            // alert('Payment Failed!');

            const msg = err.response?.data?.[0] || err.response?.data?.message || 'Payment Failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-8 overflow-hidden relative">

                {/* Top Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-400 to-indigo-600"></div>
                {error && (
                    <p className='text-red-600 font-semibold text-sm mb-2'> {error}</p>
                )}
                {/* Profile Header */}
                <div className="text-center mb-8 mt-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 text-3xl font-bold uppercase">
                        {merchant?.merchant_name?.charAt(0) || 'M'}
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Merchant Details</h1>
                    <p className="text-sm text-gray-500 italic">Information verified successfully</p>
                </div>

                {/* Info List */}
                <div className="space-y-6">
                    <InfoRow
                        label="Full Name"
                        value={merchant?.merchant_name}
                        icon={<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                    />
                    <InfoRow
                        label="Phone Number"
                        value={merchant?.phone}
                        icon={<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                    />
                    <InfoRow
                        label="Business Identity"
                        value={merchant?.business_name}
                        isHighlight={true}
                        icon={<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                    />
                </div>
                <div className="space-y-3 mb-8">
                    <label className="mt-4 block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Input Amount
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <span className="text-2xl font-bold text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                $
                            </span>
                        </div>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className='w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 pl-12 pr-6 text-3xl font-black text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-200'
                        />
                    </div>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {installmentPlans && installmentPlans.length > 0 ? (
                            installmentPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`group p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between
                                        ${selectedPlan?.id === plan.id
                                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm'
                                            : 'border-slate-50 hover:border-blue-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl transition-colors ${selectedPlan?.id === plan.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <CalendarClock size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm ${selectedPlan?.id === plan.id ? 'text-blue-900' : 'text-slate-700'}`}>
                                                {plan.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium italic">
                                                {plan.installment_count} Mo • {plan.interest_percent}% Interest
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className={`${selectedPlan?.id === plan.id ? 'text-blue-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">No plans available</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Actions */}
                <div className="mt-10 space-y-3">
                    <button 
                        disabled={!amount}
                        onClick={handlePayNow}
                        className="group w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1"
                    >
                        <span>Pay Now</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                    {creditLimit > 0 && (
                        <button
                         disabled={!amount || !selectedPlan}
                         onClick={()=> navigate('/installment-data', { state: { merchant, amount, phone, selectedPlan }})}
                        className="group w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1"
                    >
                        <span>Pay Later</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>    
                    )}
                    

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable Row Component for cleaner code
const InfoRow = ({ label, value, icon, isHighlight }) => (
    <div className="flex items-center gap-4 group">
        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-50 transition-colors border border-gray-100">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icon}
            </svg>
        </div>
        <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</p>
            <p className={`text-lg leading-tight ${isHighlight ? 'font-bold text-indigo-600' : 'text-gray-700 font-medium'}`}>
                {value || 'N/A'}
            </p>
        </div>
    </div>
);

export default MerchantData;