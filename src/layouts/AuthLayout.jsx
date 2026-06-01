function AuthLayout({ children }) {

  return (

    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-6">

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-indigo-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-violet-600/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">

        <div className="hidden lg:flex flex-col justify-center px-14 py-16 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E1B4B] border-r border-white/10">

          <div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs tracking-wide text-indigo-300 font-medium">

              AI Interview Platform

            </div>

            <h1 className="text-6xl font-black text-white mt-8 tracking-tight">

              MockVerse AI

            </h1>

            <p className="text-slate-400 text-lg leading-8 mt-6 max-w-md">

              Smarter resume analysis,
              AI-powered mock interviews,
              detailed feedback and hiring-ready
              performance reports.

            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                <h3 className="text-white font-bold text-2xl">

                  100+

                </h3>

                <p className="text-slate-400 text-sm mt-1">

                  AI Questions

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                <h3 className="text-white font-bold text-2xl">

                  ATS

                </h3>

                <p className="text-slate-400 text-sm mt-1">

                  Resume Analysis

                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="flex items-center justify-center bg-[#0F172A] px-8 py-12">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AuthLayout;