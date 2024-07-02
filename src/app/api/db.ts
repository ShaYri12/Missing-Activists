import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  try {
    const MONGODB_URI: string =
      process.env.MONGODB_URI ||
      'mongodb+srv://username:password@cluster0.3q0g6ko.mongodb.net/Missing_Activists?retryWrites=true&w=majority';

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectMongoDB;
