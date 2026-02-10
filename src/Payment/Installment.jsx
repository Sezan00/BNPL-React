import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  CheckCircle2, 
  Clock, 
  Store, 
  Calendar, 
  ChevronRight, 
  CreditCard,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserInstallments = () => {
  const [installments, setInstallments] = useState([]);


  const navigate = useNavigate();

  const navigateToSinglePaidInstallment = (installments) => {
    navigate(`/single-installment/${installments.schedule_id}`, {state:{installments}});
  }

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/installments", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setInstallments(res.data);
      } catch (err) {
        console.error("Error fetching installments:", err);
      }
    };

    fetchInstallments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Dashboard</h1>
          <p className="text-slate-500 font-medium">Track and manage your merchant installments</p>
        </header>

        {installments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-4xl border border-dashed border-slate-300">
            <Clock className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold">No installments found at the moment.</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {installments.map((inst) => (
            <div key={inst.installment_id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              
              {/* Merchant Header */}
              <div className="p-6 bg-slate-900 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                      <Store className="text-indigo-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight leading-none">{inst.merchant_name}</h3>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{inst.business_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Payable</p>
                    <p className="text-xl font-black text-indigo-400">${inst.total_payable}</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Paid So Far</p>
                    <p className="text-sm font-bold text-emerald-400">${inst.paid_amount || 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Remaining</p>
                    <p className="text-sm font-bold text-rose-400">${inst.remaining_balance}</p>
                  </div>
                </div>
              </div>

              {/* Installment Schedules Table/List */}
              <div className="p-6 grow">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Calendar size={14} /> Repayment Schedule
                </h4>
                
                <div className="space-y-3">
                  {inst.schedules.map((sch) => (
                    <div 
                      key={sch.schedule_id} 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        sch.status === 'paid' 
                        ? 'bg-emerald-50/30 border-emerald-100 opacity-80' 
                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${
                          sch.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {sch.status === 'paid' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">Installment #{sch.installment_no}</p>
                          <p className="text-[11px] text-slate-500 font-medium">Due: {sch.due_date}</p>
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        {sch.status === 'paid' ? (
                          <span className="text-[10px] font-black text-emerald-600 px-3 py-1 bg-white rounded-lg border border-emerald-100">PAID</span>
                        ) : (
                          <>
                            <p className="text-sm font-black text-slate-900">${sch.amount}</p>
                            <button 
                              onClick={()=> navigateToSinglePaidInstallment(sch)}
                            className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                  <AlertCircle size={12} /> Status: {inst.status}
                </div>
                <button className="text-[10px] font-black text-indigo-600 hover:underline flex items-center gap-1 uppercase tracking-widest">
                  View Full Details <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

export default UserInstallments;