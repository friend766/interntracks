import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Moon, Sun, LogOut, ShieldCheck, LayoutDashboard, FileText, Menu, X, Sparkles, User, ChevronDown } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenAuth, onOpenResume }) => {
  const { currentUser, isAdmin, logout, isDarkMode, toggleDarkMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Branding */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#4F6DF5] via-[#6366F1] to-[#8B7CF6] flex items-center justify-center text-white shadow-lg shadow-[#4F6DF5]/25 group-hover:scale-105 transition-all duration-200">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111827] dark:text-white">
                  Intern<span className="bg-gradient-to-r from-[#4F6DF5] to-[#8B7CF6] bg-clip-text text-transparent">Track</span>
                </span>
                <span className="hidden lg:inline-flex items-center space-x-1 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] dark:text-indigo-300 border border-[#4F6DF5]/20">
                  <Sparkles className="w-3 h-3 text-[#8B7CF6]" />
                  <span>Pro v2.0</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/60 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'landing'
                  ? 'text-[#4F6DF5] bg-white dark:bg-slate-900 shadow-sm dark:text-indigo-300'
                  : 'text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'text-[#4F6DF5] bg-white dark:bg-slate-900 shadow-sm dark:text-indigo-300'
                  : 'text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#4F6DF5]" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#475569] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 text-[#8B7CF6]" />
              <span>Resume Engine</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'admin'
                    ? 'text-amber-700 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 shadow-sm'
                    : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Admin Overseer</span>
              </button>
            )}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-2xl text-[#64748B] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-[#E2E8F0] dark:border-slate-800 active:scale-95"
              title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 shadow-sm hover:border-[#4F6DF5]/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4F6DF5] to-[#8B7CF6] text-white flex items-center justify-center font-black text-xs shadow-md">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#111827] dark:text-white leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#4F6DF5] dark:text-indigo-300">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-2xl p-2 space-y-1 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-[#E2E8F0] dark:border-slate-700">
                      <p className="text-xs font-extrabold text-[#111827] dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400 truncate">{currentUser.email}</p>
                      <p className="text-[10px] font-medium text-[#4F6DF5] dark:text-indigo-300 mt-0.5">{currentUser.university || 'Student Workspace'}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#475569] dark:text-slate-200 hover:bg-[#EEF2FF] dark:hover:bg-slate-700 hover:text-[#4F6DF5] flex items-center space-x-2 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#4F6DF5]" />
                      <span>My Workspace</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenResume();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#475569] dark:text-slate-200 hover:bg-[#EEF2FF] dark:hover:bg-slate-700 hover:text-[#4F6DF5] flex items-center space-x-2 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-[#8B7CF6]" />
                      <span>Resume Builder</span>
                    </button>

                    <div className="pt-1 border-t border-[#E2E8F0] dark:border-slate-700">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#475569] dark:text-slate-200 hover:text-[#111827] dark:hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#4F6DF5] hover:bg-[#3D5CE8] rounded-2xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-xl text-[#64748B] dark:text-slate-300">
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl text-slate-600 dark:text-slate-300">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#0B0F19] border-b border-[#E2E8F0] dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              setActiveTab('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-[#111827] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-[#111827] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2"
          >
            <LayoutDashboard className="w-4 h-4 text-[#4F6DF5]" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              onOpenResume();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-[#111827] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-[#8B7CF6]" />
            <span>Resume Builder</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Room</span>
            </button>
          )}

          <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 font-bold rounded-xl text-center"
              >
                Sign Out ({currentUser.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-center font-bold text-sm text-[#111827] dark:text-white border border-[#E2E8F0] dark:border-slate-700 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-center font-bold text-sm text-white bg-[#4F6DF5] rounded-xl"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
