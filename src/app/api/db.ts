import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Optionally, rethrow the error to handle it further up the call stack
  }
}

export default dbConnect;
