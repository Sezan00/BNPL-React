import React from 'react';
import { Search, MapPin, Star, ShoppingBag, Filter, ArrowRight, ExternalLink, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MerchantDirectory = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 md:px-16 font-sans">
      
      {/* Header & Search Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-6">
          <Store size={16} />
          <span>Over 200+ Trusted Partners</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
          Where would you like to <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Shop & Pay Later?</span>
        </h1>
        
        {/* Premium Search Bar */}
        <div className="relative max-w-3xl mx-auto group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
          </div>
          <input 
            type="text" 
            placeholder="Search by store name, brand or product..." 
            className="w-full pl-16 pr-40 py-6 bg-white border-none shadow-2xl shadow-indigo-100/40 rounded-[2.5rem] focus:ring-2 focus:ring-indigo-500 outline-none text-lg transition-all"
          />
          <button className="absolute right-3 top-3 bottom-3 bg-gray-900 text-white px-8 rounded-[1.8rem] font-bold hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-2">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {['All Stores', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Travel'].map((cat, index) => (
            <button key={cat} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${index === 0 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white text-gray-500 border-gray-100 hover:border-indigo-200 hover:text-indigo-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Merchant Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Store Card 1 */}
        <MerchantCard 
          emoji="📱"
          name="TechVerse"
          category="Gadgets & Electronics"
          rating="4.9"
          location="Online Store"
          accent="indigo"
        />

        {/* Store Card 2 */}
        <MerchantCard 
          emoji="👟"
          name="StepUp Shoes"
          category="Fashion & Footwear"
          rating="4.8"
          location="Dhaka, BD"
          accent="purple"
          isFeatured={true}
        />

        {/* Store Card 3 */}
        <MerchantCard 
          emoji="💄"
          name="Glow Studio"
          category="Beauty & Skincare"
          rating="4.7"
          location="Chittagong, BD"
          accent="pink"
        />

        {/* Store Card 4 */}
        <MerchantCard 
          emoji="🛋️"
          name="Luxe Living"
          category="Home Furniture"
          rating="4.6"
          location="Online / Retail"
          accent="orange"
        />

        {/* Store Card 5 */}
        <MerchantCard 
          emoji="🎧"
          name="Audio Max"
          category="Premium Sound"
          rating="5.0"
          location="Global Shipping"
          accent="blue"
        />
      </div>
    </div>
  );
};

// Internal Card Component for Clean Code
const MerchantCard = ({ emoji, name, category, rating, location, accent, isFeatured }) => {
    const navigate = useNavigate();
  const accentColors = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div 
    // Puro card ke clickable korar jonno ekhane onClick deya best
    onClick={() => navigate('/paymentService')}
    className={`group bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-500 hover:-translate-y-3 cursor-pointer ${
        isFeatured ? 'border-indigo-100 shadow-xl shadow-indigo-50' : 'border-gray-50 hover:shadow-2xl'
    }`}
    >
  <div className="flex justify-between items-start mb-8">
    <div className={`w-16 h-16 ${accentColors[accent]} rounded-2xl flex items-center justify-center text-3xl shadow-inner`}>
      {emoji}
    </div>
    <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-xl text-xs font-black">
      <Star size={14} fill="currentColor" /> {rating}
    </div>
  </div>

  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{name}</h3>
      {isFeatured && <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Top</span>}
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-gray-500 font-medium flex items-center gap-2 text-sm">
        <ShoppingBag size={16} className="text-gray-400" /> {category}
      </p>
      <p className="text-gray-400 flex items-center gap-2 text-sm">
        <MapPin size={16} className="text-gray-400" /> {location}
      </p>
    </div>
  </div>

  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
    <span className="text-indigo-600 font-extrabold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
      Explore Store <ExternalLink size={16} />
    </span>
    <div className="bg-gray-100 text-gray-400 p-2.5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <ArrowRight size={20} />
    </div>
  </div>
</div>
  );
};

export default MerchantDirectory;