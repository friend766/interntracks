import React from 'react';
import { Check } from 'lucide-react';

export const PricingSection = ({ onOpenAuth }) => {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            100% Free For Students
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#475569] dark:text-slate-300">
            No hidden fees or paywalls. Land your internship with complete confidence.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-gradient-to-b from-[#EEF2FF] to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border-2 border-[#4F6DF5] shadow-2xl relative">
          <div className="absolute -top-4 right-8 bg-[#4F6DF5] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Student Special
          </div>

          <h3 className="text-2xl font-black text-[#111827] dark:text-white">Student Pro Edition</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-black text-[#111827] dark:text-white">$0</span>
            <span className="ml-2 text-sm font-medium text-[#64748B] dark:text-slate-400">/ forever free</span>
          </div>

          <ul className="mt-8 space-y-4 text-sm text-[#475569] dark:text-slate-300">
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-[#4F6DF5]" />
              <span>Unlimited Internship & Job Tracking</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-[#4F6DF5]" />
              <span>Interactive Kanban Pipeline</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-[#4F6DF5]" />
              <span>Automated Email Follow-Up Reminders</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-[#4F6DF5]" />
              <span>Built-in Student Resume Builder</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-[#4F6DF5]" />
              <span>Full Admin Access (`Ammad123` / `friendly`)</span>
            </li>
          </ul>

          <button
            onClick={() => onOpenAuth('register')}
            className="w-full mt-8 py-3.5 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold rounded-xl shadow-lg shadow-[#4F6DF5]/30 transition-all hover:scale-105"
          >
            Create Free Account Now
          </button>
        </div>
      </div>
    </section>
  );
};
