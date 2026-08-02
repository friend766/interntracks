import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { memoryUsers } from './auth.js';
import { memoryApplications } from './applications.js';

const router = express.Router();

// GET all users (Admin only)
router.get('/', protect, adminOnly, (req, res) => {
  const usersWithStats = memoryUsers.map(user => {
    const userAppsCount = memoryApplications.filter(a => a.userId === user.id).length;
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      university: user.university,
      major: user.major,
      graduationYear: user.graduationYear,
      applicationsCount: userAppsCount
    };
  });

  res.json(usersWithStats);
});

// DELETE user (Admin only)
router.delete('/:id', protect, adminOnly, (req, res) => {
  const { id } = req.params;
  const index = memoryUsers.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (memoryUsers[index].username === 'Ammad123') {
    return res.status(400).json({ message: 'Cannot delete the primary Admin account' });
  }

  const deletedUser = memoryUsers.splice(index, 1);
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

export default router;
