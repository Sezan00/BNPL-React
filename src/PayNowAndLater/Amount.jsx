import axios from 'axios';
import { CalendarClock, ShieldCheck, ChevronRight, Wallet, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Amount = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Destructuring state from location
    const { merchant, phone } = location.state || {};
    
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [installmentPlans, setInstallmentPlans] = useState([]);
    const [creditLimit, setCreditLimit] = useState(0);
    const [amount, setAmount] = useState('');

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
                setCreditLimit(res.data.credit_limit || 0);
            } catch (error) {
                console.error('Installment fetch error:', error.response?.data || error.message);
            }
        };
        fetchInstallments();
    }, []);

    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10 font-sans'>
            <div className='w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/60 overflow-hidden border border-slate-100'>
                
                {/* Upper Section: Credit Visualizer */}
                <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-center opacity-80 mb-2">
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Available Credit</span>
                            <Wallet size={18} />
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tight">
                            ${creditLimit.toLocaleString()}
                        </h2>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="p-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-extrabold text-slate-900">Transfer Funds</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-slate-500 text-sm font-medium">
                                Paying: <span className="text-blue-600 font-bold">
                                    {/* FIX: merchant.business_name instead of just merchant object */}
                                    {merchant?.business_name || merchant?.merchant_name || 'Unknown Merchant'}
                                </span>
                            </p>
                            {merchant?.status === 'active' && (
                                <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified</span>
                            )}
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-3 mb-8">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
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
                    </div>

                    {/* Installment Plans Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Select Plan
                            </label>
                            <Info size={14} className="text-slate-300 cursor-help" />
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

                    {/* Next Button */}
                    <button 
                     onClick={()=> navigate('/installment-data', { state: { merchant, amount, phone, selectedPlan }})}
                        disabled={!amount || !selectedPlan}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none text-white font-black py-5 rounded-3xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                        Next page
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em]">End-to-end encrypted</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Amount;