import React from 'react';
import { Bell, ExternalLink, Mail, Clock } from 'lucide-react';

export const FollowUpReminders = ({ applications = [] }) => {
  // Find apps that are 'Applied' or 'Interview'
  const reminderApps = applications.filter(a => a.status === 'Applied' || a.status === 'Interview').slice(0, 4);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <Bell className="w-5 h-5 text-[#8B7CF6]" />
          <h3 className="text-lg font-bold text-[#111827] dark:text-white">Auto-Follow-Up Reminders</h3>
        </div>
        <p className="text-xs text-[#64748B] dark:text-slate-400">Automated timing alerts for recruiter check-ins</p>
      </div>

      <div className="space-y-3 my-4">
        {reminderApps.length === 0 ? (
          <div className="p-4 text-center text-xs text-[#64748B] dark:text-slate-400">
            No active follow-up reminders right now. Great job keeping up!
          </div>
        ) : (
          reminderApps.map((app) => (
            <div key={app.id} className="p-3.5 rounded-xl bg-[#F8FAFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700/60 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-xs text-[#111827] dark:text-white">{app.company}</span>
                <span className="text-[11px] text-[#64748B] dark:text-slate-400 block">{app.role}</span>
                <div className="flex items-center space-x-1 mt-1 text-[10px] text-[#4F6DF5] font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>Applied on {app.appliedDate}</span>
                </div>
              </div>

              <a
                href={`mailto:recruiting@${app.company.toLowerCase().replace(/\s+/g, '')}.com?subject=Follow-up%20on%20${encodeURIComponent(app.role)}%20Application`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] dark:text-indigo-300 font-bold text-[11px] rounded-lg hover:bg-[#4F6DF5] hover:text-white transition-colors flex items-center space-x-1"
              >
                <Mail className="w-3 h-3" />
                <span>Follow Up</span>
              </a>
            </div>
          ))
        )}
      </div>

      <div className="text-[11px] text-[#64748B] dark:text-slate-400 bg-[#EEF2FF]/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-[#4F6DF5]/20 text-center font-medium">
        💡 Pro-Tip: Send a polite follow-up 7–10 days after applying.
      </div>
    </div>
  );
};
