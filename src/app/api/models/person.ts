import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  images: string[];
  status: 'Missing' | 'Found' | 'Deceased';
  nationality: string;
  phoneNumber: string;
  occupation: string;
  lastSeen: string; // Consider using Date type if you want to store the date in a standardized format
  timeSeen: string;
  otherDetails: string;
  contact1: string;
  contact2: string;
}

const personSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    age: { type: Number, required: true },
    images: { type: [String], required: true },
    status: { type: String, enum: ['Missing', 'Found', 'Deceased'], default: 'Missing' },
    nationality: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    occupation: { type: String, required: true },
    lastSeen: { type: String, required: true },
    timeSeen: { type: String, required: true },
    otherDetails: { type: String, required: true },
    contact1: { type: String, required: true },
    contact2: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.models.Person || mongoose.model<IPerson>('Person', personSchema);

export default Person;
