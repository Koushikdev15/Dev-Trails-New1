"use client";

const CheckCircle = ({size, className}: any) => <span className={className} style={{fontSize: size}}>✅</span>;
const Clock = ({size, className}: any) => <span className={className} style={{fontSize: size}}>⏱️</span>;
const Wallet = ({size, className}: any) => <span className={className} style={{fontSize: size}}>💳</span>;
const TrendingUp = ({size, className}: any) => <span className={className} style={{fontSize: size}}>📈</span>;
const AlertTriangle = ({size, className}: any) => <span className={className} style={{fontSize: size}}>⚠️</span>;

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col pb-20">
      {/* Header */}
      <header className="border-b border-gray-800 p-6 flex justify-between items-center bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Claims & Financials</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">WALLET ADDR: 0x89F2A...A4B1</p>
        </div>
        <div className="text-right flex items-center space-x-4">
          <a href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-white transition">← Back to Oracles</a>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Financial Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <h2 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={16} /> Coverage Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                <span className="text-gray-400">Premium Paid</span>
                <span className="text-white font-mono">₹192 <span className="text-xs text-gray-500">(4 wks × ₹48)</span></span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                <span className="text-gray-400">Claims Received</span>
                <span className="text-white font-mono">₹1,240</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-emerald-400 font-bold">Net Benefit</span>
                <span className="text-emerald-400 font-bold text-xl font-mono">+₹1,048</span>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Wallet size={16} /> Scheme Eligibility
            </h2>
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 mb-4">
              <p className="font-bold text-emerald-500 mb-1">Gig Worker Protection Plus</p>
              <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3 mb-1">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-gray-400 flex justify-between">
                <span>Monthly Limit</span>
                <span>2 of 4 used</span>
              </p>
            </div>

            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
              <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
              <p className="text-xs text-gray-400 flex justify-between">
                <span>Annual Limit</span>
                <span>₹1,240 of ₹25,000 used</span>
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-400">Next Claim Available</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle size={14} /> Immediately</span>
            </div>
          </section>
        </div>

        {/* Right Column - Claims Timeline */}
        <div className="lg:col-span-2">
          <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl h-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Clock size={16} /> Verification & Claims Ledger
              </h2>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
                Blockchain Verified
              </span>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
              
              {/* Claim Card 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-emerald-500 text-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle size={18} className="text-gray-900" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-800 bg-gray-950 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-lg">₹450 Paid</span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">1m 47s</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300">Weather-Based Income Loss</h4>
                  <p className="text-xs text-gray-500 mt-2 font-mono">ID: #CLM2026001234</p>
                  
                  <div className="mt-3 text-xs space-y-1 text-gray-400 bg-gray-900 p-2 rounded-lg border border-gray-800">
                    <p className="flex justify-between"><span>Trigger:</span> <span className="text-blue-400">IMD Heavy Rainfall Alert</span></p>
                    <p className="flex justify-between"><span>Verified by:</span> <span>GPS + Weather Oracle</span></p>
                    <p className="flex justify-between"><span>Payout to:</span> <span className="text-emerald-500">Paytm UPI (*2134)</span></p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="bg-emerald-900/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-800">Zero-Touch</span>
                    <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded">Smart Contract</span>
                  </div>
                </div>
              </div>

              {/* Claim Card 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-emerald-500 text-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle size={18} className="text-gray-900" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-800 bg-gray-950 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-lg">₹790 Paid</span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">2m 14s</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300">AQI Hazard Comp</h4>
                  <p className="text-xs text-gray-500 mt-2 font-mono">ID: #CLM2026000982</p>
                  
                  <div className="mt-3 text-xs space-y-1 text-gray-400 bg-gray-900 p-2 rounded-lg border border-gray-800">
                    <p className="flex justify-between"><span>Trigger:</span> <span className="text-yellow-400">AQI &gt; 350 (Hazardous)</span></p>
                    <p className="flex justify-between"><span>Verified by:</span> <span>CPCB Sentinel Node</span></p>
                    <p className="flex justify-between"><span>Payout to:</span> <span className="text-emerald-500">HDFC Bank (*4521)</span></p>
                  </div>
                </div>
              </div>

              {/* Claim Card 3 - Rejected/Pending Example */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active opacity-60">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-red-500 text-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <AlertTriangle size={18} className="text-gray-900" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-800 bg-gray-950 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-lg">System Blocked</span>
                    <span className="text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded">Anti-Fraud</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-300">Manual Claim Filing</h4>
                  <p className="text-xs text-gray-500 mt-2 font-mono">ID: #CLM2026000104</p>
                  
                  <div className="mt-3 text-xs space-y-1 text-red-300/70 bg-red-950/30 p-2 rounded-lg border border-red-900/50">
                    <p>Behavioral entropy scan failed. Geolocation anomaly detected against local weather records.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
