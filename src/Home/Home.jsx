import React from 'react';
// Import icons from lucide-react
import { Wallet, ArrowRight, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// FeatureCard component definition
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white border border-gray-50 rounded-4xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export const Home = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-16 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">BNPL<span className="text-indigo-600">.</span></h1>
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-medium text-gray-600">
          <span className="cursor-pointer hover:text-indigo-600 transition-colors">Home</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-colors">How it Works</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-colors">Merchants</span>
          <button className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-6 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-md">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 mt-12 md:mt-16 gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-700 uppercase bg-indigo-50 rounded-full">
            ✨ Finance made simple
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
            Shop now, pay <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">later</span>.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience the freedom of split payments. Choose an account, shop your heart out, and manage everything in one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
            onClick={() => navigate('/merchant-signup')}
            className="group bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-8 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Start as Merchant <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
            onClick={()=> navigate('/user-signup')}
            className="bg-white border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 text-gray-700 py-4 px-8 rounded-2xl font-bold transition-all"
            >
              Create User Account
            </button>
          </div>
        </div>

        {/* Illustration Area */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-112.5 md:h-112.5">
            <div className="absolute top-10 -left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            
            <div className="relative bg-linear-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-between h-64 md:h-80 overflow-hidden">
               <div className="flex justify-between items-start">
                  <CreditCard className="text-white/90 w-12 h-12" />
                  <div className="text-white/80 font-mono tracking-widest">**** 4242</div>
               </div>
               <div>
                  <p className="text-indigo-100 text-sm mb-1 uppercase tracking-widest font-semibold">Available Credit</p>
                  <p className="text-white text-4xl font-bold font-mono">$12,450.00</p>
               </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
              <div className="bg-green-100 p-2 rounded-full">
                <ShoppingBag className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Success</p>
                <p className="text-gray-800 font-bold text-sm">Payment Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-32 px-6 md:px-16 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why people love BNPL
          </h2>
          <p className="text-gray-500">Fast, secure, and built for the modern shopper.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<CreditCard className="w-8 h-8 text-indigo-600" />} 
            title="Flexible Payments" 
            desc="Split your purchases into 4 easy interest-free installments."
          />
          <FeatureCard 
            icon={<ShoppingBag className="w-8 h-8 text-purple-600" />} 
            title="Seamless Shopping" 
            desc="Integrate with your favorite stores in just a few clicks."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />} 
            title="Safe & Secure" 
            desc="Bank-grade encryption to keep your data safe at all times."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gray-200 p-1.5 rounded-lg">
              <Wallet className="text-gray-600 w-4 h-4" />
            </div>
            <span className="font-bold text-gray-800 tracking-tight text-lg">BNPL.</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 BNPL Ecosystem. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0 text-gray-500 font-medium text-sm">
            <span className="hover:text-indigo-600 cursor-pointer transition">Privacy</span>
            <span className="hover:text-indigo-600 cursor-pointer transition">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;