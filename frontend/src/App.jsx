import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApplicationProvider, useApplications } from './context/ApplicationContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SocialProof } from './components/SocialProof';
import { DashboardPreview } from './components/DashboardPreview';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ResumeBuilder } from './components/ResumeBuilder';
import { StatCards } from './components/Dashboard/StatCards';
import { ApplicationTable } from './components/Dashboard/ApplicationTable';
import { KanbanBoard } from './components/Dashboard/KanbanBoard';
import { AnalyticsCharts } from './components/Dashboard/AnalyticsCharts';
import { FollowUpReminders } from './components/Dashboard/FollowUpReminders';
import { AddEditModal } from './components/Dashboard/AddEditModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Plus, LayoutGrid, ListFilter, Sparkles, AlertCircle } from 'lucide-react';

const MainAppContent = () => {
  const { currentUser, isAdmin } = useAuth();
  const { applications, filterStatus, setFilterStatus, searchQuery, setSearchQuery, sortOrder, setSortOrder } = useApplications();

  const [activeTab, setActiveTab] = useState('landing');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingApplication(null);
    setAddEditModalOpen(true);
  };

  const handleOpenEditModal = (app) => {
    setEditingApplication(app);
    setAddEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-slate-900 text-[#111827] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAuth={handleOpenAuth} 
        onOpenResume={() => setResumeModalOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'landing' && (
          <div>
            <HeroSection 
              onOpenAuth={handleOpenAuth} 
              onGoToDashboard={() => setActiveTab('dashboard')} 
            />
            <SocialProof />
            <DashboardPreview 
              onOpenAuth={handleOpenAuth} 
              onGoToDashboard={() => setActiveTab('dashboard')} 
            />
            <FeaturesSection />
            <HowItWorks />
            <PricingSection onOpenAuth={handleOpenAuth} />
            <AboutSection />
            <ContactSection />
          </div>
        )}

        {activeTab === 'dashboard' && (
          currentUser ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
                    Application Control Center
                  </h1>
                  <p className="text-sm text-[#475569] dark:text-slate-400 mt-1">
                    Manage applications, track interview schedules, and monitor offer progress.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setResumeModalOpen(true)}
                    className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-200 font-semibold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#8B7CF6]" />
                    <span className="hidden sm:inline">Resume Builder</span>
                  </button>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-5 py-2.5 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-[1.02] flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Application</span>
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <StatCards applications={applications} />

              {/* Analytics Charts & Reminders */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AnalyticsCharts applications={applications} />
                </div>
                <div>
                  <FollowUpReminders applications={applications} />
                </div>
              </div>

              {/* Search, Filter & View Controls */}
              <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFF] dark:bg-slate-900 text-xs font-medium text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                  />

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFF] dark:bg-slate-900 text-xs font-semibold text-[#475569] dark:text-slate-300 outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Interested">Interested</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFF] dark:bg-slate-900 text-xs font-semibold text-[#475569] dark:text-slate-300 outline-none"
                  >
                    <option value="newest">Sort: Newest First</option>
                    <option value="oldest">Sort: Oldest First</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1 p-1 bg-[#F8FAFF] dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-700 self-start md:self-auto">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                      viewMode === 'table'
                        ? 'bg-white dark:bg-slate-800 text-[#4F6DF5] dark:text-indigo-400 shadow-sm'
                        : 'text-[#64748B] dark:text-slate-400 hover:text-[#111827]'
                    }`}
                  >
                    <ListFilter className="w-4 h-4" />
                    <span>Table View</span>
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
                      viewMode === 'kanban'
                        ? 'bg-white dark:bg-slate-800 text-[#4F6DF5] dark:text-indigo-400 shadow-sm'
                        : 'text-[#64748B] dark:text-slate-400 hover:text-[#111827]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Kanban Board</span>
                  </button>
                </div>
              </div>

              {viewMode === 'table' ? (
                <ApplicationTable onEdit={handleOpenEditModal} />
              ) : (
                <KanbanBoard onEdit={handleOpenEditModal} />
              )}
            </div>
          ) : (
            <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] flex items-center justify-center mx-auto shadow-lg border border-[#4F6DF5]/20">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-[#111827] dark:text-white tracking-tight">Sign In Required</h2>
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                Please sign in with your account to access your personal dashboard, application telemetry, and kanban pipeline.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="px-6 py-3 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold rounded-xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('register')}
                  className="px-6 py-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#111827] dark:text-white font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AdminDashboard />
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <ResumeBuilder
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <AddEditModal
        isOpen={addEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        editingApp={editingApplication}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <MainAppContent />
      </ApplicationProvider>
    </AuthProvider>
  );
}
