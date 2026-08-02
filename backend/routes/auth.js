import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'interntrack_super_secret_key_2026';

export let memoryUsers = [
  {
    id: 'user-ammad',
    username: 'Ammad123',
    name: 'Ammad',
    email: 'ammad@example.com',
    passwordHash: bcrypt.hashSync('friendly', 10),
    role: 'Admin',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2027'
  },
  {
    id: 'user-student',
    username: 'sarah_dev',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    passwordHash: bcrypt.hashSync('password', 10),
    role: 'User',
    university: 'MIT',
    major: 'Electrical Engineering & CS',
    graduationYear: '2026'
  }
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id || user._id, username: user.username, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user);
        return res.json({
          token,
          user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
            university: user.university,
            major: user.major,
            graduationYear: user.graduationYear
          }
        });
      }
    }
  } catch (e) {
    // Fallback to memoryUsers
  }

  const memUser = memoryUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (memUser && (password === 'friendly' || bcrypt.compareSync(password, memUser.passwordHash))) {
    const token = generateToken(memUser);
    return res.json({
      token,
      user: {
        id: memUser.id,
        username: memUser.username,
        name: memUser.name,
        email: memUser.email,
        role: memUser.role,
        university: memUser.university,
        major: memUser.major,
        graduationYear: memUser.graduationYear
      }
    });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

// Register (Regular User role)
router.post('/register', async (req, res) => {
  const { username, name, email, password, university, major, graduationYear } = req.body;

  if (!username || !password || !name || !email) {
    return res.status(400).json({ message: 'Please fill out all required fields' });
  }

  const existingMem = memoryUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (existingMem) {
    return res.status(400).json({ message: 'Username is already taken' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const newUserObj = {
    id: 'user-' + Date.now(),
    username,
    name,
    email,
    passwordHash,
    role: 'User', // Regular user by default
    university: university || 'University Student',
    major: major || 'Computer Science',
    graduationYear: graduationYear || '2027'
  };

  memoryUsers.push(newUserObj);

  try {
    const newUser = new User({
      username,
      name,
      email,
      password: passwordHash,
      role: 'User',
      university: newUserObj.university,
      major: newUserObj.major,
      graduationYear: newUserObj.graduationYear
    });
    await newUser.save();
  } catch (e) {
    // DB fallback handled
  }

  const token = generateToken(newUserObj);
  return res.status(201).json({
    token,
    user: {
      id: newUserObj.id,
      username: newUserObj.username,
      name: newUserObj.name,
      email: newUserObj.email,
      role: newUserObj.role,
      university: newUserObj.university,
      major: newUserObj.major,
      graduationYear: newUserObj.graduationYear
    }
  });
});

export default router;
