import React, { useState } from 'react';
import { CreditCard, Clock, ChevronRight, CheckCircle2, Wallet, ArrowLeft } from 'lucide-react';

export const PaymentService = () => {
  // State for toggling between 'full' and 'installment'
  const [selectedMethod, setSelectedMethod] = useState('installment');
    
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 md:px-16 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-indigo-600 transition w-fit">
          <ArrowLeft size={18} />
          <span className="text-sm font-semibold">Back to Merchant</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT: Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
              <p className="text-gray-500 text-sm mt-1">Select your preferred way to pay.</p>
            </div>

            {/* Pay Now Option */}
            <div 
              onClick={() => setSelectedMethod('full')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedMethod === 'full' ? 'border-indigo-600 bg-white' : 'border-gray-200 bg-transparent opacity-70'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-xl ${selectedMethod === 'full' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <CreditCard size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Pay in Full</h3>
                  <p className="text-xs text-gray-500">Instant payment with secure encryption</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'full' ? 'border-indigo-600' : 'border-gray-300'}`}>
                {selectedMethod === 'full' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
              </div>
            </div>

            {/* Pay in Installments Option */}
            <div 
              onClick={() => setSelectedMethod('installment')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedMethod === 'installment' ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-50' : 'border-gray-200 bg-transparent opacity-70'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-xl ${selectedMethod === 'installment' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Installments (BNPL)</h3>
                  <p className="text-xs text-gray-500">0% Interest • Split into 3-12 months</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'installment' ? 'border-indigo-600' : 'border-gray-300'}`}>
                {selectedMethod === 'installment' && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
              </div>
            </div>

            {/* Sub-options for Installments (Only visible when selected) */}
            {selectedMethod === 'installment' && (
              <div className="grid grid-cols-3 gap-3 pt-2 animate-in fade-in duration-300">
                {['3 Months', '6 Months', '12 Months'].map((plan, i) => (
                  <div key={i} className={`p-4 rounded-2xl border text-center cursor-pointer transition ${i === 0 ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-gray-200 bg-white text-gray-500'}`}>
                    <p className="text-[10px] uppercase mb-1">{plan}</p>
                    <p className="text-lg">${i === 0 ? '400' : i === 1 ? '200' : '100'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-4xl p-8 border border-gray-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
                <Wallet className="text-indigo-600" size={20} />
                <h2 className="text-lg font-bold">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Order Amount</span>
                  <span className="font-bold text-gray-900">$1,200.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="text-indigo-600 font-bold capitalize">{selectedMethod}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-50 text-lg font-bold">
                  <span>Total Due</span>
                  <span>$1,200.00</span>
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group">
                Proceed to Pay
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentService;