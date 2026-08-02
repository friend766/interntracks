import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Interested', 'Applied', 'Interview', 'Offer Received', 'Rejected'], 
    default: 'Applied' 
  },
  appliedDate: { type: String, required: true },
  jobUrl: { type: String, default: '' },
  location: { type: String, default: '' },
  stipend: { type: String, default: '' },
  deadline: { type: String, default: '' },
  notes: { type: String, default: '' },
  round: { type: String, default: '' },
  interviewDate: { type: Date, default: null },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
