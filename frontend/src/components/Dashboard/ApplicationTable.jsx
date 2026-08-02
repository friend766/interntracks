import React from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { ExternalLink, Edit2, Trash2, Calendar, MapPin, DollarSign, StickyNote, Sparkles } from 'lucide-react';

export const ApplicationTable = ({ onEdit }) => {
  const { applications, deleteApplication } = useApplications();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Offer Received':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 shadow-emerald-500/10';
      case 'Interview':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 shadow-amber-500/10';
      case 'Applied':
        return 'bg-[#EEF2FF] text-[#4F6DF5] dark:bg-indigo-950/80 dark:text-indigo-300 border-[#4F6DF5]/30 dark:border-indigo-800/60';
      case 'Interested':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800/60';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800/60';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-[#E2E8F0] dark:border-slate-700/80 shadow-xl overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFF] dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-700 text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              <th className="py-4 px-6">Company & Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Applied Date</th>
              <th className="py-4 px-6">Location & Stipend</th>
              <th className="py-4 px-6">Notes & Stage</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-700/80 text-xs">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-[#64748B] dark:text-slate-400">
                  <div className="max-w-sm mx-auto space-y-3">
                    <Sparkles className="w-8 h-8 text-[#4F6DF5] mx-auto opacity-50" />
                    <p className="font-bold text-sm text-[#111827] dark:text-white">No applications found</p>
                    <p className="text-xs text-[#64748B] dark:text-slate-400">Try clearing search filters or click <strong>Add Application</strong> to create a new record.</p>
                  </div>
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#F8FAFF]/80 dark:hover:bg-slate-700/40 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EEF2FF] to-[#F3F1FF] dark:from-slate-800 dark:to-indigo-950/60 border border-[#4F6DF5]/20 flex items-center justify-center text-[#4F6DF5] dark:text-indigo-300 font-black text-sm shadow-sm flex-shrink-0">
                        {app.company.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-[#111827] dark:text-white text-sm leading-tight">
                          {app.company}
                        </div>
                        <div className="text-[#475569] dark:text-slate-300 font-semibold mt-0.5">
                          {app.role}
                        </div>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#4F6DF5] hover:underline mt-1"
                          >
                            <span>Posting Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border shadow-sm ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-[#475569] dark:text-slate-300 font-semibold whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>{app.appliedDate}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-[#475569] dark:text-slate-300 whitespace-nowrap">
                    {app.location && (
                      <div className="flex items-center space-x-1 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{app.location}</span>
                      </div>
                    )}
                    {app.stipend ? (
                      <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] mt-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{app.stipend}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic block mt-0.5">Not specified</span>
                    )}
                  </td>

                  <td className="py-4 px-6 max-w-xs">
                    {app.round && (
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-[#4F6DF5] dark:text-indigo-300 text-[10px] font-extrabold uppercase mb-1 border border-[#4F6DF5]/20">
                        {app.round}
                      </span>
                    )}
                    {app.notes ? (
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {app.notes}
                      </p>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No notes added</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onEdit(app)}
                        className="p-2 rounded-xl text-slate-400 hover:text-[#4F6DF5] hover:bg-[#EEF2FF] dark:hover:bg-slate-700 transition-colors"
                        title="Edit Application"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
