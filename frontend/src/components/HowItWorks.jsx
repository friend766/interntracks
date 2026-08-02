import React from 'react';
import { UserPlus, PlusCircle, CheckCircle, Trophy } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <UserPlus className="w-6 h-6 text-[#4F6DF5]" />,
      title: "Create Your Account",
      description: "Sign up in seconds or sign in as Admin (`Ammad123` / `friendly`) to view global stats."
    },
    {
      num: "02",
      icon: <PlusCircle className="w-6 h-6 text-[#8B7CF6]" />,
      title: "Log Internship Applications",
      description: "Add company, role, stipend, job URL, interview dates, and notes to your personalized dashboard."
    },
    {
      num: "03",
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      title: "Track Pipeline Status",
      description: "Use Kanban board or search filters to update status from Applied to Technical Interview."
    },
    {
      num: "04",
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      title: "Accept Your Dream Offer",
      description: "Celebrate your offers with built-in confetti and track deadlines to choose the perfect role!"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAFF] dark:bg-slate-950 transition-colors border-t border-[#E2E8F0] dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#4F6DF5] font-extrabold text-sm uppercase tracking-wider">Simple 4-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mt-2">
            How InternTrack Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#475569] dark:text-slate-300">
            Organize your job search strategy from day one to offer day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-md">
              <span className="text-4xl font-black text-[#EEF2FF] dark:text-slate-700 absolute top-4 right-4">
                {step.num}
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] dark:bg-slate-700 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
