import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { memoryApplications } from './applications.js';

const router = express.Router();

// GET Stats - strict user isolation (returns stats ONLY for the authenticated user)
router.get('/', protect, (req, res) => {
  // Always filter stats strictly for the logged-in user
  const list = memoryApplications.filter(a => a.userId === req.user.id);

  const totalApplications = list.length;
  const interviewsCount = list.filter(a => a.status === 'Interview').length;
  const offersCount = list.filter(a => a.status === 'Offer Received').length;
  const rejectedCount = list.filter(a => a.status === 'Rejected').length;
  const interestedCount = list.filter(a => a.status === 'Interested').length;
  const appliedCount = list.filter(a => a.status === 'Applied').length;

  const statusBreakdown = [
    { name: 'Interested', count: interestedCount },
    { name: 'Applied', count: appliedCount },
    { name: 'Interview', count: interviewsCount },
    { name: 'Offer Received', count: offersCount },
    { name: 'Rejected', count: rejectedCount },
  ];

  res.json({
    totalApplications,
    interviewsCount,
    offersCount,
    rejectedCount,
    statusBreakdown,
    recentApplications: list.slice(0, 5)
  });
});

export default router;
