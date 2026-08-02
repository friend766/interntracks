import express from 'express';
import { Application } from '../models/Application.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

export let memoryApplications = [
  {
    id: 'app-1',
    company: 'Google',
    role: 'Software Engineer Intern',
    status: 'Interview',
    appliedDate: '2026-07-02',
    jobUrl: 'https://careers.google.com/jobs/results/123456',
    location: 'Mountain View, CA (Hybrid)',
    stipend: '$55 / hr',
    deadline: '2026-08-15',
    notes: 'Passed initial resume screen & OA. Technical Round 1 scheduled for next Tuesday.',
    round: 'Technical Phone Screen',
    interviewDate: '2026-07-28T14:00:00',
    userId: 'user-ammad',
    createdAt: '2026-07-02T10:00:00.000Z'
  },
  {
    id: 'app-2',
    company: 'Meta',
    role: 'Frontend Engineer Intern',
    status: 'Offer Received',
    appliedDate: '2026-06-15',
    jobUrl: 'https://metacareers.com/jobs/78910',
    location: 'Menlo Park, CA / Remote',
    stipend: '$62 / hr + Relocation',
    deadline: '2026-07-30',
    notes: 'Received official offer letter! Deadline to accept is July 30th.',
    round: 'Final Offer',
    interviewDate: null,
    userId: 'user-ammad',
    createdAt: '2026-06-15T09:30:00.000Z'
  },
  {
    id: 'app-3',
    company: 'Microsoft',
    role: 'Explore Intern (SWE & PM)',
    status: 'Applied',
    appliedDate: '2026-07-10',
    jobUrl: 'https://careers.microsoft.com/us/en/job/45678',
    location: 'Redmond, WA',
    stipend: '$48 / hr',
    deadline: '2026-08-01',
    notes: 'Submitted application via university referral portal. Follow-up suggested!',
    round: null,
    interviewDate: null,
    userId: 'user-ammad',
    createdAt: '2026-07-10T11:00:00.000Z'
  },
  {
    id: 'app-4',
    company: 'Amazon',
    role: 'SDE Intern 2027',
    status: 'Interview',
    appliedDate: '2026-07-05',
    jobUrl: 'https://amazon.jobs/en/jobs/99887',
    location: 'Seattle, WA',
    stipend: '$52 / hr',
    deadline: '2026-08-10',
    notes: 'Completed OA1 and OA2 with 100% test cases. Behavioral interview on Friday.',
    round: 'Final Behavioral & System Design',
    interviewDate: '2026-07-25T11:00:00',
    userId: 'user-ammad',
    createdAt: '2026-07-05T14:20:00.000Z'
  },
  {
    id: 'app-5',
    company: 'Apple',
    role: 'iOS Developer Intern',
    status: 'Interested',
    appliedDate: '2026-07-20',
    jobUrl: 'https://jobs.apple.com/en-us/details/2001',
    location: 'Cupertino, CA',
    stipend: '$50 / hr',
    deadline: '2026-08-20',
    notes: 'Polishing portfolio project before submitting application.',
    round: null,
    interviewDate: null,
    userId: 'user-ammad',
    createdAt: '2026-07-20T16:00:00.000Z'
  },
  {
    id: 'app-6',
    company: 'Stripe',
    role: 'Backend Engineering Intern',
    status: 'Applied',
    appliedDate: '2026-07-08',
    jobUrl: 'https://stripe.com/jobs/listing/112233',
    location: 'San Francisco, CA / Remote',
    stipend: '$58 / hr',
    deadline: '2026-08-05',
    notes: 'Application under review by engineering team.',
    round: null,
    interviewDate: null,
    userId: 'user-student',
    createdAt: '2026-07-08T08:45:00.000Z'
  },
  {
    id: 'app-7',
    company: 'Datadog',
    role: 'Full Stack Engineering Intern',
    status: 'Rejected',
    appliedDate: '2026-06-01',
    jobUrl: 'https://datadoghq.com/careers/5544',
    location: 'New York, NY',
    stipend: '$45 / hr',
    deadline: '2026-06-30',
    notes: 'Position filled for Summer session.',
    round: null,
    interviewDate: null,
    userId: 'user-student',
    createdAt: '2026-06-01T12:00:00.000Z'
  },
  {
    id: 'app-8',
    company: 'Netflix',
    role: 'UI Engineer Intern',
    status: 'Interview',
    appliedDate: '2026-07-15',
    jobUrl: 'https://jobs.netflix.com/jobs/9090',
    location: 'Los Gatos, CA',
    stipend: '$65 / hr',
    deadline: '2026-08-12',
    notes: 'Technical screen scheduled with Engineering Manager.',
    round: 'Technical Screen',
    interviewDate: '2026-07-30T10:00:00',
    userId: 'user-student',
    createdAt: '2026-07-15T13:00:00.000Z'
  }
];

// GET User's Applications (Regular User gets ONLY their own apps; query scope parameter allows Admin view)
router.get('/', protect, async (req, res) => {
  const { search, status, sort, scope } = req.query;
  const isUserAdmin = req.user.role === 'Admin';
  
  let list = memoryApplications;
  
  // If not admin OR if admin is requesting personal scope, filter to own applications only
  if (!isUserAdmin || scope !== 'all') {
    list = list.filter(a => a.userId === req.user.id);
  }

  // Filter by company search
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(a => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
  }

  // Filter by status
  if (status && status !== 'All') {
    list = list.filter(a => a.status === status);
  }

  // Sort by application date
  if (sort === 'oldest') {
    list.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
  } else {
    list.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }

  res.json(list);
});

// POST Create Application (always tags the application with req.user.id)
router.post('/', protect, async (req, res) => {
  const { company, role, status, appliedDate, jobUrl, location, stipend, deadline, notes, round, interviewDate } = req.body;

  if (!company || !role || !appliedDate) {
    return res.status(400).json({ message: 'Company, role, and applied date are required' });
  }

  const newApp = {
    id: 'app-' + Date.now(),
    company,
    role,
    status: status || 'Applied',
    appliedDate,
    jobUrl: jobUrl || '',
    location: location || '',
    stipend: stipend || '',
    deadline: deadline || '',
    notes: notes || '',
    round: round || '',
    interviewDate: interviewDate || null,
    userId: req.user.id,
    createdAt: new Date().toISOString()
  };

  memoryApplications.unshift(newApp);

  try {
    const appDoc = new Application(newApp);
    await appDoc.save();
  } catch (e) {
    // DB fallback handled
  }

  res.status(201).json(newApp);
});

// PUT Update Application
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const index = memoryApplications.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }

  // Check ownership unless Admin
  if (req.user.role !== 'Admin' && memoryApplications[index].userId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to edit another user\'s application' });
  }

  memoryApplications[index] = {
    ...memoryApplications[index],
    ...req.body,
    id // preserve id
  };

  res.json(memoryApplications[index]);
});

// DELETE Application
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const index = memoryApplications.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }

  // Check ownership unless Admin
  if (req.user.role !== 'Admin' && memoryApplications[index].userId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete another user\'s application' });
  }

  const deleted = memoryApplications.splice(index, 1);
  res.json({ message: 'Application deleted successfully', deleted });
});

export default router;
