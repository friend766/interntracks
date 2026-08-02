import React from 'react';
import { Briefcase } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#111827] text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4F6DF5] to-[#8B7CF6] flex items-center justify-center text-white">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Intern<span className="text-[#4F6DF5]">Track</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-xs text-slate-400 flex items-center">
            Built for Ammad &nbsp;•&nbsp; InternTrack v2.0
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} InternTrack. All rights reserved. Track Your Applications. Land Your Dream Internship.
        </div>
      </div>
    </footer>
  );
};
