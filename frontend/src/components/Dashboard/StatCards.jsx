import React from 'react';
import { Briefcase, Calendar, Trophy, XCircle, TrendingUp, Sparkles } from 'lucide-react';

export const StatCards = ({ applications = [] }) => {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'Interview').length;
  const offers = applications.filter(a => a.status === 'Offer Received').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;

  const responseRate = total > 0 ? Math.round(((interviews + offers) / total) * 100) : 0;

  const cards = [
    {
      title: 'Total Applications',
      count: total,
      sub: total > 0 ? `${total} active in pipeline` : 'Start by adding an application',
      icon: <Briefcase className="w-6 h-6 text-[#4F6DF5]" />,
      glow: 'shadow-[#4F6DF5]/10',
      bg: 'bg-[#EEF2FF] dark:bg-indigo-950/80',
      border: 'border-[#4F6DF5]/30',
      badge: 'Active Scope'
    },
    {
      title: 'Active Interviews',
      count: interviews,
      sub: interviews > 0 ? `${interviews} interview round${interviews === 1 ? '' : 's'}` : 'No active screens yet',
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      glow: 'shadow-amber-500/10',
      bg: 'bg-amber-50 dark:bg-amber-950/80',
      border: 'border-amber-500/30',
      badge: 'In Progress'
    },
    {
      title: 'Offers Received',
      count: offers,
      sub: offers > 0 ? '🎉 Official offer letter!' : 'Targeting offers',
      icon: <Trophy className="w-6 h-6 text-emerald-500" />,
      glow: 'shadow-emerald-500/10',
      bg: 'bg-emerald-50 dark:bg-emerald-950/80',
      border: 'border-emerald-500/30',
      badge: 'Success'
    },
    {
      title: 'Interview Conversion',
      count: `${responseRate}%`,
      sub: `${interviews + offers} positive responses`,
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      glow: 'shadow-purple-500/10',
      bg: 'bg-purple-50 dark:bg-purple-950/80',
      border: 'border-purple-500/30',
      badge: 'Telemetry'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-3xl bg-white dark:bg-slate-800 border ${card.border} shadow-md ${card.glow} flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white mt-2 tracking-tight">
                {card.count}
              </div>
            </div>

            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              {card.icon}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-slate-700/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#475569] dark:text-slate-300">
              {card.sub}
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[#64748B] dark:text-slate-300">
              {card.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
