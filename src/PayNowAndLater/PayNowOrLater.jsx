import { ShieldCheck, Smartphone } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const PayNowOrLater = () => {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    return (
        <>
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

                        </div>
                        <button
                            disabled={!phone}
                            className="w-full mt-5 bg-indigo-600 text-white py-4 rounded-2xl font-bold disabled:bg-slate-300"
                            onClick={() => {
                                navigate('/merchant-data', {
                                    state: {
                                        phone
                                    }
                                })
                            }}
                        >
                            Continue with Installment
                        </button>
                </div>

            </div>
        </>
    )
}

export default PayNowOrLater;
