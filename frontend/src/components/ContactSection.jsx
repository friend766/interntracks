import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#111827] dark:text-white">Get In Touch</h2>
          <p className="mt-2 text-sm text-[#475569] dark:text-slate-300">
            Have a question or feedback regarding InternTrack? Send us a message below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#F8FAFF] dark:bg-slate-800 p-8 rounded-3xl border border-[#E2E8F0] dark:border-slate-700 shadow-lg space-y-6">
          {submitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold">Thank you! Your message has been received.</span>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ammad"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-[#A5B4FC] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ammad@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-[#A5B4FC] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] dark:text-white uppercase mb-2">Message</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How can we help you land your dream internship?"
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-[#A5B4FC] outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#4F6DF5] hover:bg-[#3D5CE8] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </section>
  );
};
