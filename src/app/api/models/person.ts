import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  status: 'Missing' | 'Found' | 'Deceased';
}

const personSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, },
    status: { type: String, enum: ['Missing', 'Found', 'Deceased'], required: true },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.models.Person || mongoose.model<IPerson>('Person', personSchema);

export default Person;
