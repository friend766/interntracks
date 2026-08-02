import React from 'react';

export const SocialProof = () => {
  const logos = [
    'Stanford University',
    'MIT',
    'Harvard',
    'UC Berkeley',
    'Carnegie Mellon',
    'Oxford',
    'Georgia Tech'
  ];

  return (
    <div className="py-8 bg-white dark:bg-slate-900 border-y border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider mb-6">
          Trusted by top students and applicants from
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-75 dark:opacity-60">
          {logos.map((logo, idx) => (
            <span
              key={idx}
              className="text-sm sm:text-base font-extrabold text-[#111827] dark:text-slate-200 tracking-tight hover:text-[#4F6DF5] transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
