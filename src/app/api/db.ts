import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect(retries = 5) {
  if (connection.isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  for (let i = 0; i < retries; i++) {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }

      const db = await mongoose.connect(process.env.MONGODB_URI, {
        connectTimeoutMS: 60000, // 60 seconds
        serverSelectionTimeoutMS: 60000, // 60 seconds
        socketTimeoutMS: 60000, // 60 seconds
        family: 4, // Use IPv4, skip trying IPv6
      });

      connection.isConnected = db.connections[0].readyState;
      console.log('MongoDB connected successfully');
      break;
    } catch (error) {
      console.error(`Error connecting to MongoDB (attempt ${i + 1} of ${retries}):`, error);
      if (i === retries - 1) {
        throw error; // Rethrow error after final attempt
      }
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
}

export default dbConnect;
