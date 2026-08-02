import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Kanban, Bell, FileText, Lock, ShieldCheck } from 'lucide-react';

export const HeroSection = ({ onOpenAuth, onGoToDashboard }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[#F8FAFF] dark:bg-[#0B0F19] transition-colors">
      {/* Dynamic Background Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-[#4F6DF5]/15 via-[#8B7CF6]/20 to-transparent dark:from-indigo-900/20 dark:via-purple-900/15 pointer-events-none rounded-full blur-3xl opacity-80 -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Version / Launch Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-[#E2E8F0] dark:border-slate-700/80 shadow-sm hover:border-[#4F6DF5]/40 transition-all cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-[#4F6DF5] animate-ping" />
            <span className="text-xs font-semibold text-[#475569] dark:text-slate-300">
              Next-Gen Student Career Workspace & Application OS
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#111827] dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Track Applications. <br />
            <span className="bg-gradient-to-r from-[#4F6DF5] via-[#8B7CF6] to-[#10B981] bg-clip-text text-transparent">
              Land Your Dream Internship.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#475569] dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            The modern, high-performance tracker built for students. Organize application pipelines, track interview rounds, set recruiter follow-up alerts, and generate ATS resumes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-4 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-[#4F6DF5]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-8 py-4 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-[#111827] dark:text-white border border-[#E2E8F0] dark:border-slate-700 font-bold text-base rounded-2xl shadow-md backdrop-blur transition-all flex items-center justify-center space-x-2 hover:border-[#8B7CF6]/40"
            >
              <Lock className="w-5 h-5 text-[#8B7CF6]" />
              <span>Sign In to Workspace</span>
            </button>
          </div>

          {/* Feature Showcase Grid */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-slate-700 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] dark:bg-slate-700 text-[#4F6DF5] flex items-center justify-center font-black">
                <Kanban className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">Kanban Pipeline</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Drag and drop applications across Interested, Applied, Interview, and Offer stages.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-slate-700 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3F1FF] dark:bg-slate-700 text-[#8B7CF6] flex items-center justify-center font-black">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">Recruiter Follow-Ups</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Receive automated prompts to email recruiters and follow up after key timeframes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-slate-700 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-slate-700 text-emerald-600 flex items-center justify-center font-black">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">ATS Resume Engine</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Generate polished, ATS-optimized student resumes ready to export to PDF or text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
