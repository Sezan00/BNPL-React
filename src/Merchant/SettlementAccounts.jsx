import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SettlementAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/merchant/settlement-accounts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAccounts(res.data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAccounts(); }, []);

  const handleActivate = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/merchant/settlement-accounts/${id}/activate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchAccounts();
    } catch (error) { console.error(error); }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#1E1E21] font-sans antialiased p-6 md:p-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Main Action */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
              <span>Merchant</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-indigo-600">Settlement Accounts</span>
            </nav>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Payout Architecture</h1>
          </div>
          <button
            onClick={()=> navigate('/bank-add')}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95">
            Link New Account
          </button>
        </header>

        {/* --- ADVANCED ELEMENT: Quick Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Linked Nodes</p>
            <p className="text-3xl font-bold">{accounts.length}</p>
          </div>
          <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Target</p>
            <p className="text-sm font-medium text-indigo-600 truncate">
              {accounts.find(a => a.status === 'active')?.bank_name || 'None Set'}
            </p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-100 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Security Status</p>
            <p className="text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Encrypted (AES-256)
            </p>
          </div>
        </div>

        {/* --- ADVANCED ELEMENT: Interactive List --- */}
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Account Identity</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verification</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accounts.map((account) => (
                  <tr key={account.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          account.status === 'active' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 tracking-tight text-lg">{account.bank_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500 font-medium">{account.account_holder_name}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-xs font-mono text-slate-400 tracking-tighter">•••• {account.bank_account_number.slice(-4)}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-8">
                      {account.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          Primary
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
                          Standby
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {account.status !== 'active' ? (
                          <button 
                            onClick={() => handleActivate(account.id)}
                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
                          >
                            Set Active
                          </button>
                        ) : (
                          <div className="h-10 flex items-center px-4 text-emerald-600">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                        <button className="p-2.5 bg-white border border-slate-100 text-slate-300 hover:text-slate-900 rounded-xl hover:border-slate-300 transition-all">
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Empty State Footer */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          <p>© 2026 Core Financial Services</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span className="cursor-pointer hover:text-indigo-600 transition-colors">Audit Log</span>
             <span className="cursor-pointer hover:text-indigo-600 transition-colors">API Docs</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettlementAccounts;