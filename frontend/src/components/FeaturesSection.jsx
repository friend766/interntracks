import React from 'react';
import { Kanban, Bell, FileCode2, Shield, Search, Moon } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Kanban className="w-6 h-6 text-[#4F6DF5]" />,
      title: "Interactive Kanban Pipeline",
      description: "Drag and drop your applications effortlessly through Interested, Applied, Interview, Offer, and Rejected stages."
    },
    {
      icon: <Bell className="w-6 h-6 text-[#8B7CF6]" />,
      title: "Smart Auto-Follow-Up Reminders",
      description: "Never miss a follow-up date. Automated prompts notify you when it's time to email recruiters."
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-emerald-500" />,
      title: "Built-In Student Resume Builder",
      description: "Create polished, ATS-ready resumes tailored for tech and corporate internship applications."
    },
    {
      icon: <Search className="w-6 h-6 text-amber-500" />,
      title: "Advanced Search & Filtering",
      description: "Filter applications by status, search company names, and sort by application or interview dates."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      title: "Role-Based Access Control",
      description: "Elevated Admin panel for overall management (`Ammad123` / `friendly`) alongside individual student accounts."
    },
    {
      icon: <Moon className="w-6 h-6 text-sky-500" />,
      title: "Seamless Dark Mode Support",
      description: "Sleek, eye-friendly dark mode designed with precision color palette tokens for midnight study sessions."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Everything You Need to Land Your Dream Internship
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-slate-300">
            A comprehensive suite of tools built specifically for students navigating competitive application cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-2xl bg-[#F8FAFF] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#4F6DF5]/40 dark:hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-[#4F6DF5]/5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#475569] dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
