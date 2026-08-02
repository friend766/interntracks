import React from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { Edit2, Trash2, MapPin, DollarSign, Calendar, ArrowRightLeft, Sparkles } from 'lucide-react';

export const KanbanBoard = ({ onEdit }) => {
  const { applications, updateApplication, deleteApplication } = useApplications();

  const columns = [
    { name: 'Interested', accent: 'border-t-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20' },
    { name: 'Applied', accent: 'border-t-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20' },
    { name: 'Interview', accent: 'border-t-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20' },
    { name: 'Offer Received', accent: 'border-t-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' },
    { name: 'Rejected', accent: 'border-t-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20' }
  ];

  const handleStatusChange = (appId, newStatus) => {
    updateApplication(appId, { status: newStatus });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto pb-6">
      {columns.map((col) => {
        const colApps = applications.filter(a => a.status === col.name);

        return (
          <div
            key={col.name}
            className={`bg-white dark:bg-slate-800/90 rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] dark:border-slate-700/80 border-t-4 ${col.accent.split(' ')[0]} flex flex-col h-full shadow-md min-w-[260px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E8F0] dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-xs text-[#111827] dark:text-white uppercase tracking-wider">
                  {col.name}
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${col.accent}`}>
                {colApps.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3.5 flex-1 min-h-[320px]">
              {colApps.length === 0 ? (
                <div className="h-36 border-2 border-dashed border-slate-200 dark:border-slate-700/60 rounded-2xl flex flex-col items-center justify-center text-xs text-slate-400 font-semibold p-4 text-center">
                  <Sparkles className="w-5 h-5 mb-1.5 opacity-40 text-slate-400" />
                  <span>No {col.name.toLowerCase()} apps</span>
                </div>
              ) : (
                colApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#F8FAFF] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all duration-200 space-y-3 group hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] font-black text-xs flex items-center justify-center border border-[#4F6DF5]/20 flex-shrink-0">
                          {app.company.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-[#111827] dark:text-white leading-tight">{app.company}</h4>
                          <p className="text-xs text-[#475569] dark:text-slate-300 font-semibold line-clamp-1">{app.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(app)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#4F6DF5] hover:bg-[#EEF2FF] dark:hover:bg-slate-800 transition-colors"
                          title="Edit Application"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {app.stipend && (
                      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px]">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{app.stipend}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-[#64748B] dark:text-slate-400 space-y-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Applied: {app.appliedDate}</span>
                      </div>
                      {app.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{app.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Move Selector */}
                    <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 mb-1">
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>Move Stage</span>
                      </div>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="w-full text-[11px] font-bold px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                      >
                        {columns.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
