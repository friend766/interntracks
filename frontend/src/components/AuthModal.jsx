import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    university: '',
    major: ''
  });

  useEffect(() => {
    setMode(initialMode);
    setError('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await login(formData.username, formData.password);
      } else {
        await register(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your details.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E2E8F0] dark:border-slate-800 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1.5 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4F6DF5] to-[#8B7CF6] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#4F6DF5]/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#111827] dark:text-white">
            {mode === 'login' ? 'Sign In to Workspace' : 'Create Student Account'}
          </h2>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {mode === 'login' ? 'Access your private applications, kanban & stats' : 'Start tracking your application pipeline for free'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-extrabold text-[#111827] dark:text-white uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#111827] dark:text-white uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-extrabold text-[#111827] dark:text-white uppercase mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#111827] dark:text-white uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 mt-6"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 text-center">
          <div className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
            {mode === 'login' ? "Don't have an account? " : "Already registered? "}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="text-[#4F6DF5] font-extrabold hover:underline ml-1"
            >
              {mode === 'login' ? 'Sign Up Free' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
