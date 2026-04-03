"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [triggerFired, setTriggerFired] = useState(false);
  const [claimStatus, setClaimStatus] = useState<null | 'INITIATED' | 'VERIFIED' | 'PAID'>(null);

  const simulateDisaster = () => {
    setTriggerFired(true);
    setClaimStatus('INITIATED');
    
    setTimeout(() => setClaimStatus('VERIFIED'), 2000);
    setTimeout(() => setClaimStatus('PAID'), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-6 flex justify-between items-center bg-gray-900/50 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold">Rajesh Kumar</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">STATUS: FULLY PROTECTED • POLYGON ID: 0x89F...A4B</p>
        </div>
        <div className="text-right flex items-center space-x-6">
          <Link href="/history" className="text-sm font-bold text-gray-300 hover:text-white transition hidden md:block border border-gray-700 px-4 py-2 rounded-lg bg-gray-900">
            View Claims & Financials ↗
          </Link>
          <div>
            <p className="text-emerald-500 font-bold text-xl">₹48 / week</p>
            <p className="text-xs text-gray-400">Next billing: Sun 11:59PM</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Live Environmental Oracles
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Weather (IMD)</p>
                <p className="text-xl font-bold text-emerald-500">Clear</p>
              </div>
              <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">AQI (Mumbai)</p>
                <p className="text-xl font-bold text-yellow-500">124</p>
              </div>
              <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Traffic (Zone A)</p>
                <p className="text-xl font-bold text-emerald-500">Fluid</p>
              </div>
              <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Seismic</p>
                <p className="text-xl font-bold text-emerald-500">Stable</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-300 mb-4">Zero-Touch Claims Simulation</h2>
            <p className="text-sm text-gray-400 mb-6">Press the button below to simulate an API-triggered severe weather event (&gt;100mm rainfall).</p>
            
            {!triggerFired ? (
              <button 
                onClick={simulateDisaster}
                className="w-full bg-red-900/30 text-red-400 border border-red-500/30 hover:bg-red-900/50 font-bold py-4 rounded-xl transition-all"
              >
                🚨 SIMULATE FLASH FLOOD (API TRIGGER)
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-950 rounded-xl border border-gray-800">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${claimStatus ? 'bg-emerald-500/20 text-emerald-500' : 'bg-gray-800'}`}>1</div>
                  <div>
                    <h3 className="font-bold">Disruption Detected</h3>
                    <p className="text-xs text-gray-400">OpenWeatherMap verified 114mm/hr rainfall in Pin 400053</p>
                  </div>
                </div>

                <div className={`flex items-center space-x-4 p-4 rounded-xl border ${claimStatus === 'VERIFIED' || claimStatus === 'PAID' ? 'bg-gray-950 border-gray-800' : 'bg-gray-900 border-gray-800 opacity-50'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${claimStatus === 'VERIFIED' || claimStatus === 'PAID' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-gray-800'}`}>2</div>
                  <div>
                    <h3 className="font-bold">Multi-modal Verification</h3>
                    <p className="text-xs text-gray-400">Checking Geolocation, GPS entropy, and Social Proof...</p>
                  </div>
                </div>

                <div className={`flex items-center space-x-4 p-4 rounded-xl border ${claimStatus === 'PAID' ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-gray-900 border-gray-800 opacity-50'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${claimStatus === 'PAID' ? 'bg-emerald-500 text-black' : 'bg-gray-800'}`}>₹</div>
                  <div>
                    <h3 className="font-bold text-emerald-400">Claim Auto-Paid via UPI</h3>
                    <p className="text-xs text-emerald-500/70">₹500.00 transferred to rajesh@paytm instantly.</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-300 mb-4">Community Mesh</h2>
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-center mb-4">
              <p className="text-3xl font-bold text-white mb-1">127</p>
              <p className="text-xs text-gray-400">Protected Workers in Andheri</p>
            </div>
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-center">
              <p className="text-xl font-bold text-emerald-500 mb-1">₹18,450</p>
              <p className="text-xs text-gray-400">Total Group Claims Paid</p>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-300 mb-4">Trust Score</h2>
            <div className="flex items-center justify-center py-4">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <span className="text-4xl font-bold">94</span>
                <span className="absolute bottom-2 text-[10px] text-emerald-500 font-bold uppercase track">High Trust</span>
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">Zero-touch claims are enabled</p>
          </section>
        </div>
      </main>
    </div>
  );
}
