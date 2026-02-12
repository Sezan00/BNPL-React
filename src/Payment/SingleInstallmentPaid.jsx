import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SingleInstallmentPaid = () => {
  const { state } = useLocation();
  const installment = state?.installments;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(installment?.status === "paid");
  const [error, setError] = useState("");
  console.log('installment', installment);
  if (!installment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] font-sans">
        <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center text-3xl mb-4">🛸</div>
        <h2 className="text-gray-400 font-medium tracking-tight">Data out of reach.</h2>
        <button onClick={() => navigate("/")} className="mt-6 text-indigo-600 font-bold text-sm uppercase tracking-widest">Return Home</button>
      </div>
    );
  }

  const isPaid = installment.status === "paid";

   const handlePayment = async () => {
    if (paid) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/installments/pay-single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          installment_schedule_id: installment.schedule_id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setPaid(true);
        alert("Installment paid successfully!");
      } else {
        setError(data.error || "Payment failed");
      }
    } catch (err) {
      setError(err.message || "Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans antialiased text-[#1A1C21]">
      
      {/* Main Container */}
      <div className="w-full max-w-120">
        
        {/* Top Floating Nav */}
        <div className="flex justify-between items-center mb-8 px-2">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Live Transaction</span>
          </div>
        </div>

        {/* The Card */}
        <div className="bg-[#FFFFFF]/80 backdrop-blur-xl rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-white overflow-hidden">
          
          {/* Hero Section */}
          <div className="p-10 pb-6 text-center">
            <span className="text-[12px] font-bold text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-tighter">
              Installment No. {installment.installment_no}
            </span>
            <div className="mt-8 mb-2">
              <span className="text-3xl font-medium text-gray-400 leading-none">$</span>
              <h1 className="inline text-7xl font-black tracking-tighter text-[#1A1C21] leading-none">
                {installment.amount}
              </h1>
            </div>
            <p className="text-gray-400 font-medium">Scheduled for {installment.due_date}</p>
          </div>

          {/* Details Bento Grid */}
          <div className="px-6 pb-6 grid grid-cols-2 gap-3">
            <div className="bg-gray-50/50 p-6 rounded-4xl border border-gray-100/50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Status</p>
              <div className={`text-sm font-black uppercase ${isPaid ? 'text-emerald-500' : 'text-orange-500'}`}>
                {isPaid ? '● Verified' : '○ Pending'}
              </div>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-4xl border border-gray-100/50 text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Category</p>
              <div className="text-sm font-black text-gray-800 uppercase">
                Financing
              </div>
            </div>
          </div>

          {/* Divider with Logo */}
          <div className="relative flex items-center px-10">
            <div className="grow h-px bg-gray-100"></div>
            <div className="mx-4 w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-inner">
               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="grow h-px bg-gray-100"></div>
          </div>

          {/* Action Area */}
          <div className="p-10 pt-6">
             <div className="flex justify-between items-center mb-10 text-sm px-2">
                <span className="text-gray-400 font-medium italic">Ref: #ID-{Math.floor(Math.random()*99999)}</span>
                <span className="text-gray-800 font-bold underline decoration-indigo-200">View Invoice</span>
             </div>

             {!isPaid ? (
               <button onClick={handlePayment} className="group relative w-full h-20 bg-[#1A1C21] text-white rounded-[28px] font-bold text-lg overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95">
                 <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <span className="relative z-10 flex items-center justify-center gap-3">
                   Confirm Payment
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                 </span>
               </button>
             ) : (
               <div className="w-full h-20 bg-emerald-50 text-emerald-600 rounded-[28px] flex items-center justify-center gap-3 font-black text-lg border border-emerald-100">
                 <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                 </div>
                 PAID SUCCESSFULLY
               </div>
             )}
          </div>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium leading-relaxed">
          Authorized and regulated by the Financial Conduct Authority. <br/>
          Secure 256-bit SSL encrypted connection.
        </p>
      </div>
      
      {/* Custom Styles for better rendering */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
      `}} />
    </div>
  );
};

export default SingleInstallmentPaid;