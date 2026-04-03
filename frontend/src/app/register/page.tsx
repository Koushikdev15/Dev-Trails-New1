"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Mumbai',
    pin_code: '',
    occupation: 'DELIVERY'
  });
  
  const [premium, setPremium] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculatePremium = async () => {
    setLoading(true);
    try {
      // In a real app this would hit the FastAPI backend
      // We will simulate the same response here for the exact MVP experience as requested
      const occ_map: Record<string, number> = {"DELIVERY": 1.2, "CONSTRUCTION": 1.4, "DOMESTIC": 0.9};
      const occ_mul = occ_map[formData.occupation] || 1.0;
      
      let risk_factor = 1.0 + (Math.random() * 0.5);
      if (formData.city === 'Mumbai' || formData.city === 'Chennai') risk_factor += 0.3;
      
      let raw_premium = (30.0 * occ_mul) * risk_factor;
      let discount = 0;
      let explanation = `Base rate applied for ${formData.occupation}. `;
      
      if (risk_factor > 1.2) {
        explanation += `Your area ${formData.pin_code} has higher structural risks right now. `;
      } else {
        discount = 5.0;
        raw_premium -= discount;
        explanation += `Safeguard discount of ₹${discount} applied for low historic incident rate. `;
      }

      setTimeout(() => {
        setPremium({
          final_premium: Math.max(raw_premium, 20.0).toFixed(2),
          discount_applied: discount,
          explanation,
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12 font-sans flex justify-center items-center">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">HustleGuard <span className="text-emerald-500">Quantum</span></h1>
        <p className="text-gray-400 mb-8">AI-Powered Worker KYC & Premium Profile</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-emerald-500 transition" 
              placeholder="Rajesh Kumar"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-emerald-500 transition"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Pin Code</label>
              <input 
                type="text" 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-emerald-500 transition" 
                placeholder="400053"
                value={formData.pin_code}
                onChange={e => setFormData({...formData, pin_code: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Occupation Matrix</label>
            <select 
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-emerald-500 transition"
              value={formData.occupation}
              onChange={e => setFormData({...formData, occupation: e.target.value})}
            >
              <option value="DELIVERY">Delivery Partner (Zomato/Swiggy)</option>
              <option value="CONSTRUCTION">Construction Worker</option>
              <option value="DOMESTIC">Domestic Worker</option>
            </select>
          </div>

          {!premium ? (
            <button 
              onClick={calculatePremium}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              {loading ? "Analyzing Environmental & Risk Data..." : "Run Neural Premium Engine™"}
            </button>
          ) : (
            <div className="mt-8 p-5 bg-gray-800 border border-emerald-500/30 rounded-xl space-y-3 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Hyper-local Weekly Premium</span>
                <span className="text-emerald-400 font-bold text-2xl">₹{premium.final_premium}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-emerald-500 text-xs font-bold block mb-1">EXPLAINABLE AI</span>
                {premium.explanation}
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full mt-4 bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all"
              >
                Activate Coverage Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
