import React, { useState } from 'react';
import { X, Download, FileText, Sparkles, Check, Printer, Copy, Layers } from 'lucide-react';

export const ResumeBuilder = ({ isOpen, onClose }) => {
  const [template, setTemplate] = useState('modern'); // 'modern' | 'minimal' | 'executive'
  const [resumeData, setResumeData] = useState({
    name: 'Full Name',
    title: 'Software Engineering Intern Applicant',
    email: 'student@university.edu',
    phone: '+1 (555) 019-2831',
    github: 'github.com/username',
    linkedin: 'linkedin.com/in/username',
    summary: 'Computer Science student passionate about full-stack web engineering, distributed systems, and modern UI performance. Seeking Summer SWE Internship.',
    education: 'B.S. in Computer Science — University Name (GPA: 3.8/4.0, Exp. Grad 2027)',
    skills: 'Languages: JavaScript (ES6+), Python, TypeScript, C++ | Web: React.js, Node.js, Express, Tailwind CSS, REST APIs | Databases: MongoDB, PostgreSQL | Tools: Git, Vercel, Docker',
    projects: 'InternTrack (Full-Stack Application OS) — Built role-isolated internship tracker with Vite, Node.js, MongoDB, Kanban pipelines, and ATS resume export.'
  });

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${resumeData.name.toUpperCase()}
${resumeData.title}
Email: ${resumeData.email} | Phone: ${resumeData.phone} | GitHub: ${resumeData.github} | LinkedIn: ${resumeData.linkedin}

PROFESSIONAL SUMMARY
${resumeData.summary}

EDUCATION
${resumeData.education}

TECHNICAL SKILLS
${resumeData.skills}

FEATURED PROJECTS
${resumeData.projects}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 border border-[#E2E8F0] dark:border-slate-800 shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4F6DF5] to-[#8B7CF6] flex items-center justify-center text-white shadow-lg shadow-[#4F6DF5]/20">
              <FileText className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white">ATS Student Resume Engine</h2>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-slate-800 text-[#4F6DF5] dark:text-indigo-300">
                  Interactive Preview
                </span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400">Generate high-converting ATS resume layouts optimized for tech internship applications</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Template Style Selector */}
        <div className="flex items-center justify-between bg-[#F8FAFF] dark:bg-slate-800/60 p-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#64748B] dark:text-slate-400">
            <Layers className="w-4 h-4 text-[#4F6DF5]" />
            <span>Select Style Theme:</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                template === 'modern'
                  ? 'bg-[#4F6DF5] text-white shadow-md shadow-[#4F6DF5]/20'
                  : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('minimal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                template === 'minimal'
                  ? 'bg-[#8B7CF6] text-white shadow-md shadow-[#8B7CF6]/20'
                  : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700'
              }`}
            >
              Minimalist Clean
            </button>
            <button
              onClick={() => setTemplate('executive')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                template === 'executive'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700'
              }`}
            >
              Academic Standard
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Inputs */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider">
              1. Resume Content Inputs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase mb-1">Target Title</label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase mb-1">Education & University</label>
              <input
                type="text"
                value={resumeData.education}
                onChange={(e) => setResumeData({...resumeData, education: e.target.value})}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase mb-1">Technical Skills Stack</label>
              <textarea
                rows={2}
                value={resumeData.skills}
                onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase mb-1">Key Experience & Projects</label>
              <textarea
                rows={3}
                value={resumeData.projects}
                onChange={(e) => setResumeData({...resumeData, projects: e.target.value})}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-[#A5B4FC]"
              />
            </div>
          </div>

          {/* Right Live A4 Sheet Preview */}
          <div className="flex flex-col justify-between text-left">
            <div>
              <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider mb-4">
                2. Live PDF Document Preview
              </h3>

              {/* Document Sheet Paper View */}
              <div className={`p-7 rounded-2xl border shadow-xl transition-all ${
                template === 'modern'
                  ? 'bg-white dark:bg-slate-900 border-[#4F6DF5]/30'
                  : template === 'minimal'
                  ? 'bg-[#FAFAFA] dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-900 border-emerald-500/30'
              }`}>
                {/* Name & Header */}
                <div className={`pb-3 border-b ${
                  template === 'modern' ? 'border-[#4F6DF5]' : template === 'minimal' ? 'border-slate-300' : 'border-emerald-600'
                }`}>
                  <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
                    {resumeData.name}
                  </h2>
                  <p className={`text-xs font-extrabold mt-0.5 ${
                    template === 'modern' ? 'text-[#4F6DF5]' : template === 'minimal' ? 'text-slate-600 dark:text-slate-300' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {resumeData.title}
                  </p>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-1 font-medium">
                    {resumeData.email} • {resumeData.phone} • {resumeData.github}
                  </p>
                </div>

                {/* Resume Sections */}
                <div className="space-y-4 pt-4 text-xs">
                  <div>
                    <h4 className="font-extrabold text-[#111827] dark:text-white uppercase text-[10px] tracking-wider mb-1">
                      Education
                    </h4>
                    <p className="text-[#475569] dark:text-slate-300 font-medium leading-relaxed">
                      {resumeData.education}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-[#111827] dark:text-white uppercase text-[10px] tracking-wider mb-1">
                      Technical Skills
                    </h4>
                    <p className="text-[#475569] dark:text-slate-300 font-medium leading-relaxed">
                      {resumeData.skills}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-[#111827] dark:text-white uppercase text-[10px] tracking-wider mb-1">
                      Featured Projects & Experience
                    </h4>
                    <p className="text-[#475569] dark:text-slate-300 font-medium leading-relaxed">
                      {resumeData.projects}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handlePrint}
                className="w-full sm:flex-1 py-3 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#4F6DF5]/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Export to PDF / Print</span>
              </button>

              <button
                onClick={handleCopyText}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#111827] dark:text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center space-x-2 border border-[#E2E8F0] dark:border-slate-700"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[#8B7CF6]" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
