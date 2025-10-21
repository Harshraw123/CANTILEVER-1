export default function Philosophy() {
    return (
      <section className="relative px-8 lg:px-16 py-20 lg:py-32 bg-white overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent transform rotate-45"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent transform -rotate-45"></div>
        </div>
  
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <div className="inline-block mb-4">
              <div className="text-[11px] uppercase tracking-[0.3em] text-black/40 font-mono relative">
                <span className="relative font-semibold text-shadow-md tracking-tight z-10">
                  Our Philosophy
                </span>
                <div className="absolute inset-0 bg-black/5 blur-xl"></div>
              </div>
            </div>
  
            <h2 className="text-5xl italic text-shadow-md tracking-tight lg:text-[72px] text-black leading-[1.05] mb-6 ">
              What We{" "}
              <span className="relative inline-block">
                Believe
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-700 via-cyan-900 to-slate-900"></div>
              </span>{" "}
              In
            </h2>
  
            <p className="text-cyan-900 text-[15px] leading-relaxed tracking-wide">
              Our content strategy combines authentic storytelling, expert insights, and community-driven conversations.
            </p>
          </div>
  
          {/* Philosophy Cards */}
          <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Quality First */}
            <div className="group relative">
              <div className="absolute shadow-md inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
  
              <div className="relative p-8 lg:p-10 rounded-2xl bg-white border-2 border-black/10 hover:border-black/30 transition-all duration-700 hover:translate-y-[-8px] hover:shadow-2xl cursor-pointer overflow-hidden">
                {/* Scan line */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/50 to-transparent animate-scan"></div>
                </div>
  
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
  
                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-rose-100 group-hover:border-rose-300 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-rose-700 group-hover:scale-110 transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
  
                  <h3 className="text-2xl font-light text-black tracking-wide mb-3">Quality First</h3>
                  <p className="text-black/50 text-[14px] leading-relaxed font-light group-hover:text-black/70 transition-colors duration-500">
                    Every article is thoroughly researched, fact-checked, and crafted to deliver genuine value.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Community Driven */}
            <div className="group relative lg:mt-12">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
  
              <div className="relative p-8 lg:p-10 rounded-2xl bg-white border-2 border-black/10 hover:border-black/30 transition-all duration-700 hover:translate-y-[-8px] hover:shadow-2xl cursor-pointer overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-cyan-100 group-hover:border-cyan-300 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-cyan-700 group-hover:scale-110 transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
  
                  <h3 className="text-2xl font-light text-black tracking-wide mb-3">Community Driven</h3>
                  <p className="text-black/50 text-[14px] leading-relaxed font-light group-hover:text-black/70 transition-colors duration-500">
                    Building meaningful connections with readers who share our passion for learning and growth.
                  </p>
                </div>
              </div>
            </div>
  
            {/* Always Evolving */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
  
              <div className="relative p-8 lg:p-10 rounded-2xl bg-white border-2 border-black/10 hover:border-black/30 transition-all duration-700 hover:translate-y-[-8px] hover:shadow-2xl cursor-pointer overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-emerald-100 group-hover:border-emerald-300 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-emerald-700 group-hover:scale-110 transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
  
                  <h3 className="text-2xl font-light text-black tracking-wide mb-3">Always Evolving</h3>
                  <p className="text-black/50 text-[14px] leading-relaxed font-light group-hover:text-black/70 transition-colors duration-500">
                    Staying ahead of trends while maintaining timeless principles that matter most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <style jsx>{`
          @keyframes scan {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(400px);
              opacity: 0;
            }
          }
        `}</style>
      </section>
    );
  }
  