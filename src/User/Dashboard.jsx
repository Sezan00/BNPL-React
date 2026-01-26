import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  const handleLogut = async () => {
    try{
      const token = localStorage.getItem("token");
       await axios.post(`http://localhost:8000/api/logout`, 
        {},
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      navigate('/user-login');

    }catch(err){
      console.log('Can not logout', err)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">

        {/* Left Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-indigo-600 mb-1">BNPL</h2>
          <p className="text-gray-500 text-sm mb-6">User Dashboard</p>

          <nav className="flex-1 flex flex-col gap-2">
            <button className="py-3 px-4 rounded-xl bg-indigo-50 text-indigo-600 text-left font-medium">
              Dashboard
            </button>
            <button className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 text-left">
              Installments
            </button>
            <button
              onClick={()=> navigate('/merchantlist')}
             className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 text-left"
             >
              Pay later
            </button>
            <button className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 text-left">
              Transactions
            </button>
            <button className="py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 text-left">
              Profile
            </button>
          </nav>

          <button 
            onClick={handleLogut}
          className="py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 mt-4 text-left">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Hello, User 👋</h1>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold">
                U
              </div>
            </div>
          </div>

          {/* Credit Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-sm text-gray-500">Total Credit Limit</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">৳50,000</p>
              <p className="text-xs text-green-600 mt-1">Available: ৳31,500</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-sm text-gray-500">Next Due</p>
              <p className="text-2xl font-bold text-red-500 mt-2">৳2,500</p>
              <p className="text-xs text-gray-500 mt-1">Due on 25 Jan</p>
            </div>
            <div className="bg-white shadow rounded-2xl p-6">
              <p className="text-sm text-gray-500">Active Installments</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">3</p>
              <p className="text-xs text-yellow-600 mt-1">Pending Payment</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6 flex gap-4">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">
              Pay Now
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold">
              View Details
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Daraz</p>
                  <p className="text-xs text-gray-500">৳12,000 - 12 Jan</p>
                </div>
                <span className="text-red-500 font-semibold">Pending</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Pickaboo</p>
                  <p className="text-xs text-gray-500">৳6,500 - 5 Jan</p>
                </div>
                <span className="text-green-600 font-semibold">Paid</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">Ajkerdeal</p>
                  <p className="text-xs text-gray-500">৳8,000 - 20 Dec</p>
                </div>
                <span className="text-yellow-600 font-semibold">Partial</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  )
}

export default Dashboard;