'use client'

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold font-display">
                BI
              </div>
              <span className="font-display font-bold text-lg">
                Bharat<span className="gradient-text">Insight</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              AI-Powered Public Data Intelligence Platform for India. Empowering data-driven governance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-4 font-display">Platform</h4>
            <div className="space-y-2 text-sm text-white/40">
              <div className="hover:text-white/70 transition-colors cursor-pointer">Dashboard</div>
              <div className="hover:text-white/70 transition-colors cursor-pointer">Analytics</div>
              <div className="hover:text-white/70 transition-colors cursor-pointer">AI Insights</div>
              <div className="hover:text-white/70 transition-colors cursor-pointer">Datasets</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/70 mb-4 font-display">Departments</h4>
            <div className="space-y-2 text-sm text-white/40">
              <div className="hover:text-white/70 transition-colors cursor-pointer">🏥 Health</div>
              <div className="hover:text-white/70 transition-colors cursor-pointer">🌾 Agriculture</div>
              <div className="hover:text-white/70 transition-colors cursor-pointer">📚 Education</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-xs">
            © 2024 Bharat Insight. Built for the Government of India Data Initiative.
          </div>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
