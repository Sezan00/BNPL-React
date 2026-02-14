import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PayAllInstallment = () => {
  const [summary, setSummary] = useState(null);
  const { state } = useLocation();
  const installment = state?.inst;
  const [paid, setPaid] = useState(installment?.status?.toLowerCase() === "paid"); //if it was already all paid then return
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const pendingScheduleIds = installment?.schedules
  //   ?.filter(s => s.status !== 'paid')
  //   .map(s => s.schedule_id) || [];

  const installmentID = installment?.installment_id;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!installmentID || !token) return;

        const res = await axios.get(`http://localhost:8000/api/pending-all-installment/${installmentID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchSummary();
  }, [installmentID]);

  const handlePayment = async () => {
    if (paid) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/pay-all-installment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          installment_id: installmentID,
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        {/* Back Button (Optional) */}
        <button onClick={() => window.history.back()} className="mb-6 flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Installments
        </button>

        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Checkout.</h2>
            <p className="text-gray-500 mb-10 text-lg">Review your total pending installments and complete the payment.</p>

            {summary ? (
              <div className="space-y-8">
                {/* Visual Summary Box */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium text-sm uppercase tracking-widest">Pending Count</span>
                    <span className="text-black font-bold">{summary.total_pending} Schedules</span>
                  </div>
                  <div className="h-[1px] bg-gray-200 w-full mb-4"></div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-400 text-xs uppercase block mb-1">Total Payable</span>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-medium text-gray-900 mr-1">$</span>
                        <span className="text-5xl font-black text-gray-900">{summary.total_amount}</span>
                      </div>
                    </div>
                    {/* Status Dot */}
                    <div className="flex items-center space-x-2 text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                      <span>Pending</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {error}
                  </div>
                )}

                {/* The "Big" Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading || paid}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden group shadow-xl hover:shadow-2xl active:scale-[0.98] ${
                    paid 
                      ? "bg-emerald-500 text-white" 
                      : loading 
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : paid ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        <span>Payment Received</span>
                      </>
                    ) : (
                      <>
                        <span>Pay Total Amount</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            ) : (
              /* Skeleton Loader */
              <div className="space-y-6 animate-pulse">
                <div className="h-32 bg-gray-100 rounded-2xl"></div>
                <div className="h-16 bg-gray-100 rounded-2xl"></div>
              </div>
            )}
          </div>
          
          {/* Footer Info */}
          <div className="bg-gray-50 p-6 flex justify-center items-center space-x-6 text-gray-400 grayscale opacity-70">
            <span className="text-[10px] font-bold tracking-widest uppercase">SSL SECURE</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">24/7 SUPPORT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayAllInstallment;