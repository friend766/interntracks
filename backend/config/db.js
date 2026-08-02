import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin123@cluster0.zr5630j.mongodb.net/interntrack?retryWrites=true&w=majority';
  
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected to Atlas Database: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to Atlas (${error.message}). Running backend in hybrid memory-persistent mode.`);
  }
};
