export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8 font-sans text-center relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 mt-12 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          HustleGuard <span className="text-white">Quantum</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
          Protection at the speed of life.
        </p>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12">
          The world's first AI-powered parametric income insurance for India's 15 million gig workers. We don't just compensate for income loss—we predict it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Worker Onboarding Flow
          </a>
          
          <a href="/dashboard" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full transition-all border border-gray-700">
            View Live Dashboard
          </a>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full p-6 border-t border-gray-800 bg-gray-950/80 backdrop-blur-md text-sm text-gray-500 flex justify-between">
        <span>Guidewire DEVTrails 2026</span>
        <span>Version: Quantum MVP 1.0</span>
      </div>
    </div>
  );
}
