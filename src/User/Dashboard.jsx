import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  History, 
  User, 
  LogOut, 
  Wallet, 
  ArrowUpRight, 
  Bell,
  Search
} from 'lucide-react';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  console.log(token);

  // here is show user data 

  // useEffect(()=>{
  //     const token = localStorage.getItem('token');
  //     axios.get(`http://localhost:8000/api/user-data`, {
  //       headers:{
  //         Authorization: `Bearer ${token}`,
  //       }
  //     }).then(res=>setUser(res.data.user))
  //       .catch(err => console.log(err));
  // }, []);

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const token = localStorage.getItem('token');
         const res = await axios.get('http://localhost:8000/api/user-data', {
          headers:{
            Authorization: `Bearer ${token}`
          }
         })
         setUser(res.data)
         console.log(res.data);
      } catch(err) {
      }
    }
    fetchData();
  }, [])

//   useEffect(() => {
//   console.log('Current user state:', user);
// }, [user]);

  const handleLogut = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/user-login');
    } catch (err) {
      console.log('Can not logout', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">BNPL <span className="text-indigo-600">Pay</span></h2>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<History size={20}/>} label="Installments" />
          <NavItem icon={<CreditCard size={20}/>} label="Add Card" onClick={()=> navigate('/add-card')}/>
          <NavItem icon={<CreditCard size={20}/>} label="Pay Now" onClick={() => navigate('/pay-now')} />
          <NavItem icon={<CreditCard size={20}/>} label="Pay later" onClick={() => navigate('/merchantlist')} />
          <NavItem icon={<User size={20}/>} label="Profile" />
        </nav>

        <button 
          onClick={handleLogut}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {user?.name}👋</h1>
            <p className="text-gray-500 text-sm">Welcome back! Your credit score is looking great.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 text-gray-400 hover:bg-white hover:shadow-sm rounded-full cursor-pointer">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FD]"></span>
            </div>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-gray-50">
              <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">A</div>
              <span className="text-sm font-semibold">My Account</span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Balance Card (Glassmorphism Effect) */}
          <div className="col-span-12 md:col-span-8 bg-linear-to-br from-indigo-600 to-indigo-800 border-radius: 2rem p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-indigo-100 text-sm font-medium mb-1">Current Available Balance</p>
                  <h2 className="text-4xl font-bold tracking-tight">${user?.balance}</h2>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <Wallet size={28} />
                </div>
              </div>
              
              <div className="flex gap-10">
                <div>
                  <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1 font-semibold">Total Limit</p>
                  <p className="text-xl font-semibold">৳50,000</p>
                </div>
                <div>
                  <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1 font-semibold">Used Amount</p>
                  <p className="text-xl font-semibold">৳18,500</p>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-20 -top-20 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
          </div>

          {/* Next Due Card */}
          <div className="col-span-12 md:col-span-4 bg-white border border-gray-100 border-radius: 2rem p-8 shadow-sm">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
               <ArrowUpRight size={24} />
            </div>
            <p className="text-gray-500 font-medium mb-1">Next Payment Due</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">৳2,500.00</h3>
            <p className="text-sm text-red-500 font-semibold bg-red-50 inline-block px-3 py-1 rounded-full">
              Due on 25 Jan
            </p>
          </div>

          {/* Table / Transactions */}
          <div className="col-span-12 bg-white border border-gray-100 border-radius: 2remp-8 shadow-sm mt-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
              <button className="text-indigo-600 font-semibold text-sm hover:underline">See all transactions</button>
            </div>

            <div className="space-y-6">
              <TransactionItem name="Daraz" date="12 Jan, 2024" amount="12,000" status="Pending" color="amber" />
              <TransactionItem name="Pickaboo" date="05 Jan, 2024" amount="6,500" status="Success" color="green" />
              <TransactionItem name="Ajkerdeal" date="20 Dec, 2023" amount="8,000" status="Partial" color="indigo" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Reusable Navigation Item
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      active 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
      : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
    }`}
  >
    {icon}
    {label}
  </button>
);

// Reusable Transaction Item
const TransactionItem = ({ name, date, amount, status, color }) => {
  const statusColors = {
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-2xl transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-gray-800">{name}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">৳{amount}</p>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[color]}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;