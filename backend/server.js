import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import userRoutes from './routes/users.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (cluster0.zr5630j.mongodb.net)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
  res.json({
    app: 'InternTrack Backend API',
    status: 'Running',
    version: '1.0.0',
    adminAccount: {
      username: 'Ammad123',
      password: 'friendly'
    },
    database: 'MongoDB Atlas (cluster0.zr5630j.mongodb.net)'
  });
});

app.listen(PORT, () => {
  console.log(`[InternTrack Backend] Server listening on http://localhost:${PORT}`);
});
