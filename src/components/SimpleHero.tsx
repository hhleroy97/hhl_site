export default function SimpleHero() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-3xl">
          <div className="glass-card p-8 md:p-12">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] mb-4">
              <span className="bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Hartley Leroy
              </span>
            </h1>
            
            <p className="mt-4 text-lg text-zinc-300">
              Cloud & creative engineer — robotics fleet management, data pipelines, and realtime visuals.
            </p>
            
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
              <span>Charlotte, NC</span>
              <span>Open to freelance · FT</span>
              <a href="mailto:hartley.leroy1997@gmail.com" className="underline decoration-1 underline-offset-2 hover:decoration-2 hover:underline-offset-1 transition-all">
                Email
              </a>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="btn-primary">
                <span>View Work</span>
              </button>
              <a href="/docs/Hartley_LeRoy_Resume_Aug25.pdf" className="btn-secondary">
                Resume
              </a>
            </div>
            
            <div className="mt-3 text-xs text-zinc-400">
              Now: building realtime viz templates & cloud data tools
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}