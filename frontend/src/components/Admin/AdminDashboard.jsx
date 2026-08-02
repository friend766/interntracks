import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { ShieldCheck, Users, Briefcase, Trash2 } from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser, users, deleteUser } = useAuth();
  const { allApplications, deleteApplication } = useApplications();

  const handleDeleteUser = (userId) => {
    try {
      deleteUser(userId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteApp = (appId) => {
    if (window.confirm('Are you sure you want to delete this application record from the platform?')) {
      deleteApplication(appId);
    }
  };

  const getUserName = (userId) => {
    const found = users?.find(u => u.id === userId);
    return found ? `${found.name} (@${found.username})` : userId;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Admin Platform Overseer Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System Control Panel</h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            LoggedIn Overseer: <strong>{currentUser?.name || 'Admin'}</strong> (Role: {currentUser?.role || 'Admin'})
          </p>
        </div>

        <div className="bg-amber-950/60 backdrop-blur px-4 py-3 rounded-2xl border border-amber-500/30 text-xs space-y-1">
          <div>🛡️ <strong>Platform Status:</strong> Operational</div>
          <div>📊 <strong>Total Platform Users:</strong> {users?.length || 0}</div>
          <div>📋 <strong>Total Platform Applications:</strong> {allApplications?.length || 0}</div>
        </div>
      </div>

      {/* Registered Users Management */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#4F6DF5]" />
            <h2 className="text-lg font-bold text-[#111827] dark:text-white">Registered Platform Users</h2>
          </div>
          <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
            {users?.length || 0} Accounts Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFF] dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-700 uppercase tracking-wider text-[#64748B] font-bold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">University & Major</th>
                <th className="py-3 px-4">Apps Count</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-700">
              {users?.map((user) => {
                const userAppsCount = allApplications?.filter(a => a.userId === user.id).length || 0;
                return (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#111827] dark:text-white">{user.name}</div>
                      <div className="text-[#64748B] dark:text-slate-400 text-[11px]">{user.email} (@{user.username})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.role === 'Admin' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] dark:text-slate-300">
                      <div>{user.university}</div>
                      <div className="text-[10px] text-[#64748B] dark:text-slate-400">{user.major} ({user.graduationYear})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#4F6DF5]">{userAppsCount} apps</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {user.id !== 'user-ammad' ? (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete User Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Primary Admin</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Applications Overseer Management */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-[#8B7CF6]" />
            <h2 className="text-lg font-bold text-[#111827] dark:text-white">Global Platform Applications Overseer</h2>
          </div>
          <span className="text-xs font-bold text-[#64748B] dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
            {allApplications?.length || 0} Total Records Across All Users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFF] dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-700 uppercase tracking-wider text-[#64748B] font-bold">
                <th className="py-3 px-4">Applicant (Owner)</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-700">
              {allApplications?.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#4F6DF5]">{getUserName(app.userId)}</td>
                  <td className="py-3 px-4 font-bold text-[#111827] dark:text-white">{app.company}</td>
                  <td className="py-3 px-4 text-[#475569] dark:text-slate-300">{app.role}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] dark:bg-slate-700 text-[#4F6DF5] dark:text-indigo-300">
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#64748B] dark:text-slate-400">{app.appliedDate}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Application Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
