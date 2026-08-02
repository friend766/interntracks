import React from 'react';
import { ArrowRight, Sparkles, Kanban, Bell, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';

export const DashboardPreview = ({ onOpenAuth, onGoToDashboard }) => {
  const { currentUser } = useAuth();
  const { userApplications } = useApplications();

  return (
    <section className="py-16 bg-[#F8FAFF] dark:bg-slate-900 border-t border-b border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#8B7CF6]" />
            <span>Application Control Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Comprehensive Job Hunt Command Center
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#475569] dark:text-slate-300">
            Streamline your search with real-time analytics, kanban tracking, interview dates, and ATS resume tools.
          </p>
        </div>

        {currentUser ? (
          /* Signed In State: Shows User's Quick Status Banner */
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-[#E2E8F0] dark:border-slate-700 shadow-xl text-center max-w-2xl mx-auto mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] dark:bg-slate-700 text-[#4F6DF5] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827] dark:text-white">
              Welcome Back, {currentUser.name}!
            </h3>
            <p className="text-sm text-[#475569] dark:text-slate-300 mt-1">
              You currently have <strong className="text-[#4F6DF5] font-extrabold">{userApplications.length}</strong> application{userApplications.length === 1 ? '' : 's'} logged in your workspace.
            </p>
            <button
              onClick={onGoToDashboard}
              className="mt-6 px-6 py-3 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Signed Out State: Feature Showcase Cards (No Personal Application Counts) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] dark:bg-slate-700 flex items-center justify-center text-[#4F6DF5] mb-4">
                <Kanban className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#111827] dark:text-white mb-1">Kanban Pipeline</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Organize applications visually from Interested to Applied, Interview, and Offer Received.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#F3F1FF] dark:bg-slate-700 flex items-center justify-center text-[#8B7CF6] mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#111827] dark:text-white mb-1">Personal Telemetry</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Track your active interviews, response rates, and offer statistics in real-time.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-amber-500 mb-4">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#111827] dark:text-white mb-1">Recruiter Reminders</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Automated follow-up prompts to email recruiters after key application timeframes.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-500 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#111827] dark:text-white mb-1">ATS Resume Builder</h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                Generate clean, ATS-optimized student resumes ready to export to PDF or plain text.
              </p>
            </div>
          </div>
        )}

        {!currentUser && (
          <div className="text-center">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-3.5 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold rounded-xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Create Your Personal Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
