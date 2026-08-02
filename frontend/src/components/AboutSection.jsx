import React from 'react';
import { Shield, Sparkles, Zap } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-[#F8FAFF] dark:bg-slate-950 transition-colors border-t border-[#E2E8F0] dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#4F6DF5] font-extrabold text-sm uppercase tracking-wider">About InternTrack</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mt-2">
              Empowering Students to Reach Their Full Potential
            </h2>
            <p className="mt-4 text-base text-[#475569] dark:text-slate-300 leading-relaxed">
              InternTrack was founded to solve the chaotic spreadsheet nightmare of job hunting. By consolidating company applications, interview rounds, salary stipends, and follow-ups in one clean workspace, students focus on what matters most — preparing and landing top-tier internships.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-2xl font-black text-[#4F6DF5]">15,000+</span>
                <span className="block text-xs text-[#64748B] dark:text-slate-400 mt-1">Applications Tracked</span>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-2xl font-black text-[#8B7CF6]">88%</span>
                <span className="block text-xs text-[#64748B] dark:text-slate-400 mt-1">Interview Rate</span>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-2xl font-black text-emerald-500">4,200+</span>
                <span className="block text-xs text-[#64748B] dark:text-slate-400 mt-1">Offers Received</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-[#E2E8F0] dark:border-slate-700 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">Platform Highlights</h3>
            
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F8FAFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700">
              <Shield className="w-5 h-5 text-[#4F6DF5] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#111827] dark:text-white">Strict Data Privacy</h4>
                <p className="text-[11px] text-[#64748B] dark:text-slate-400">User accounts and applications are completely isolated and private.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F8FAFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700">
              <Zap className="w-5 h-5 text-[#8B7CF6] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#111827] dark:text-white">Interactive Kanban & Analytics</h4>
                <p className="text-[11px] text-[#64748B] dark:text-slate-400">Drag-and-drop status stages and visual offer telemetry.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#F8FAFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700">
              <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#111827] dark:text-white">Built-In ATS Resume Builder</h4>
                <p className="text-[11px] text-[#64748B] dark:text-slate-400">Format student experiences into ATS-optimized templates instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
