import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MerchantDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [merchant, setMerchant] = useState(null);
  const [transactions, setTransaction] = useState([]);

  // fetch merchant data 

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/merchant/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setMerchant(res.data);
        console.log('merchant data', res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMerchantData();
  }, []);

  //fetch transaction 

  useEffect(() => {
    const fetchTransactionData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8000/api/merchant/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTransaction(res.data.data || []);
      console.log('Transaction', res.data.data)
    }
    fetchTransactionData();
  }, [])


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/merchant/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      navigate('/merchant-login');

    } catch (err) {
      console.log('Can not logout', err)
    }
  }


  return (
    <div className="min-h-screen bg-[#fcfcfd] flex font-sans text-slate-900">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-8">
        <div className="mb-12">
          <span className="text-2xl font-black tracking-tighter text-indigo-600 italic">M.PORTAL</span>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="space-y-1 border-b border-gray-50 pb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Store Management</p>
            <p className="text-sm font-bold text-indigo-600 cursor-pointer mb-3">Main Dashboard</p>
            <p className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition mb-3">Order History</p>
            <p className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition mb-3">Payouts</p>
            <p className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition mb-3">Settings</p>
          </div>

          {/* logout  */}
          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="text-sm font-black text-red-500 hover:text-red-700 transition uppercase tracking-widest"
            >
              Logout Now
            </button>
          </div>
        </nav>

        <div className="mt-auto">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Status</p>
            <p className="text-xs font-bold text-green-600 mt-1 uppercase">Active & Verified</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Merchant Overview</h1>
            <p className="text-sm text-gray-400 font-medium">Monitoring your shop's BNPL performance.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
              Create Invoice
            </button>
            <button
              onClick={()=>navigate('/settlement-accounts')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
              Bank Accounts
            </button>
            <button 
              onClick={()=>navigate('/bank-add')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
              Add Bank Account
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Volume</p>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">${merchant?.balance}</h2>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[75%]"></div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Settled Funds</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">৳62,500</h2>
            <p className="text-xs font-bold text-green-500 mt-4 uppercase">Ready for Payout</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Active BNPL Orders</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">12</h2>
            <p className="text-xs font-bold text-indigo-600 mt-4 uppercase">4 New Today</p>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="text-xl font-black">Recent Transactions</h3>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600">Export All</span>
          </div>

          <div className="space-y-1">
            {transactions.map((txn) => (
              <MerchantRow
                key={txn.id}
                name={txn.user ? txn.user.name : "Unknown"}
                date={new Date(txn.created_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                amount={`$${txn.amount}`}
                plan={txn.type === "credit" ? "Credit" : "Debit"}
              />
            ))
            }
          </div>
        </div>


      </main>
    </div>
  );
};

const MerchantRow = ({ name, date, amount, plan }) => (
  <div className="flex items-center justify-between p-5 rounded-3xl hover:bg-gray-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-slate-900 leading-none mb-1">{name}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-black text-lg text-slate-900">{amount}</p>
      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{plan} Plan</p>
    </div>
  </div>
);

export default MerchantDashboard;