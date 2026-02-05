import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    CheckCircle, 
    Calendar, 
    Percent, 
    CreditCard, 
    ArrowLeft, 
    User, 
    Hash,
    ReceiptText,
    ArrowRight
} from 'lucide-react';

const PaymentSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data from location state
    const { phone, amount, plan, preview } = location.state || {};

    // Guard clause jodi data na thake
    if (!preview) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">No payment data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-medium"
                >
                    <ArrowLeft size={18} /> Back to Plans
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                    
                    {/* Top Header Section */}
                    <div className="bg-slate-900 p-8 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-1">Payment To</p>
                                <h2 className="text-2xl font-black">{preview.merchant.merchant_name}</h2>
                                <p className="text-indigo-400 text-sm">{preview.merchant.business_name}</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                                <ReceiptText size={28} className="text-indigo-300" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Customer Phone</p>
                                    <p className="font-bold text-slate-700">{phone}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400">
                                    <Hash size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Selected Package</p>
                                    <p className="font-bold text-slate-700">{plan.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Amount Breakdown Card */}
                        <div className="bg-indigo-50/50 rounded-[2rem] p-6 border border-indigo-100 mb-8">
                            <h3 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                <CreditCard size={16} /> Cost Breakdown
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-slate-600 italic">
                                    <span>Principal Amount</span>
                                    <span>${parseFloat(amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 italic">
                                    <span>Interest Fee</span>
                                    <span className="text-emerald-600">+${preview.interest}</span>
                                </div>
                                <div className="pt-3 border-t border-indigo-200 flex justify-between items-center">
                                    <span className="font-bold text-slate-900">Total Payable</span>
                                    <span className="text-2xl font-black text-indigo-700">${preview.total_payable}</span>
                                </div>
                            </div>
                        </div>

                        {/* Installment Timeline */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Schedule</h3>
                            <div className="space-y-3">
                                {preview.installments.map((i, idx) => (
                                    <div key={i.installment_no} className="flex items-center gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                                            {idx !== preview.installments.length - 1 && <div className="w-[2px] h-10 bg-slate-100"></div>}
                                        </div>
                                        <div className="flex-1 bg-white border border-slate-100 p-4 rounded-2xl flex justify-between items-center group-hover:border-indigo-200 transition">
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">Installment #{i.installment_no}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Calendar size={12} /> Due: {i.due_date}
                                                </p>
                                            </div>
                                            <div className="text-right text-slate-900 font-black">
                                                ${i.amount}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                            Confirm & Complete Payment
                            <ArrowRight size={20} />
                        </button>
                        
                        <p className="text-center text-[10px] text-slate-400 mt-6 px-10">
                            By confirming, you authorize the automated deduction of installments according to the schedule above.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;