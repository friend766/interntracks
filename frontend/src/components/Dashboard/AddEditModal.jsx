import React, { useState, useEffect } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { X, Briefcase, Building, MapPin, DollarSign, Calendar, Link, FileText } from 'lucide-react';

export const AddEditModal = ({ isOpen, onClose, editingApp }) => {
  const { addApplication, updateApplication } = useApplications();

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    jobUrl: '',
    location: '',
    stipend: '',
    deadline: '',
    notes: '',
    round: ''
  });

  useEffect(() => {
    if (editingApp) {
      setFormData({
        company: editingApp.company || '',
        role: editingApp.role || '',
        status: editingApp.status || 'Applied',
        appliedDate: editingApp.appliedDate || new Date().toISOString().split('T')[0],
        jobUrl: editingApp.jobUrl || '',
        location: editingApp.location || '',
        stipend: editingApp.stipend || '',
        deadline: editingApp.deadline || '',
        notes: editingApp.notes || '',
        round: editingApp.round || ''
      });
    } else {
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        jobUrl: '',
        location: '',
        stipend: '',
        deadline: '',
        notes: '',
        round: ''
      });
    }
  }, [editingApp, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingApp) {
      updateApplication(editingApp.id, formData);
    } else {
      addApplication(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#E2E8F0] dark:border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-black text-[#111827] dark:text-white mb-6">
          {editingApp ? 'Edit Application' : 'Add New Application'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Google"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Position / Role *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="Software Engineer Intern"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none"
              >
                <option value="Interested">Interested</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Application Date *</label>
              <input
                type="date"
                required
                value={formData.appliedDate}
                onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Mountain View, CA / Remote"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Stipend / Salary</label>
              <input
                type="text"
                value={formData.stipend}
                onChange={(e) => setFormData({...formData, stipend: e.target.value})}
                placeholder="$55 / hr + Housing"
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Job Link (URL)</label>
            <input
              type="url"
              value={formData.jobUrl}
              onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
              placeholder="https://careers.company.com/job/123"
              className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Interview Round / Details</label>
            <input
              type="text"
              value={formData.round}
              onChange={(e) => setFormData({...formData, round: e.target.value})}
              placeholder="e.g. Technical Round 1 (Data Structures)"
              className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-1">Notes</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Passed resume screen. Preparing for LeetCode medium questions..."
              className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#475569] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white shadow-md transition-all"
            >
              {editingApp ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
