import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const AnalyticsCharts = ({ applications = [] }) => {
  const statuses = ['Interested', 'Applied', 'Interview', 'Offer Received', 'Rejected'];
  const COLORS = ['#8B7CF6', '#4F6DF5', '#F59E0B', '#10B981', '#EF4444'];

  const data = statuses.map(st => {
    return {
      name: st,
      value: applications.filter(a => a.status === st).length
    };
  }).filter(item => item.value > 0);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-[#111827] dark:text-white">Application Overview</h3>
        <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Distribution breakdown by current recruitment status</p>
      </div>

      <div className="h-64 w-full my-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No application data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="text-xs text-[#64748B] dark:text-slate-400 text-center border-t border-slate-100 dark:border-slate-700/50 pt-3">
        Showing real-time status telemetry
      </div>
    </div>
  );
};
