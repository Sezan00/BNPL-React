import { ShieldCheck, Smartphone } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PayNowOrLater = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleContinue = async () => {
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const res = await axios.get(`http://localhost:8000/api/get-merchant/${phone}`, {
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
            });

            //stop navigation
            if (res.data.message) {
                setError(res.data.message); 
                return; 
            }

            // Success → navigate
            navigate('/merchant-data', { state: { phone } });

        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong';
            setError(msg);
        }
    };



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className='w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8'>
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 items-center justify-center bg-indigo-50 rounded-2xl mb-4">
                        <ShieldCheck className="text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold">Make Payment</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Choose instant or installment
                    </p>
                </div>

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

                    {error && (
                        <p className="text-red-600 font-semibold text-sm mt-2">{error}</p>
                    )}
                </div>

                <button
                    disabled={!phone}
                    className="w-full mt-5 bg-indigo-600 text-white py-4 rounded-2xl font-bold disabled:bg-slate-300"
                    onClick={handleContinue}
                >
                    Continue with Installment
                </button>
            </div>
        </div>
    )
}

export default PayNowOrLater;
