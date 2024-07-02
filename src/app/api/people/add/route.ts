// pages/api/addPerson.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../db';
import Person, { IPerson } from '../../models/Person';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']); // Set allowed methods
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { name, status } = req.body;

    // Validate input if needed
    if (!name || !status) {
      return res.status(400).json({ error: 'Name and status are required' });
    }

    // Create new person instance
    const newPerson: IPerson = new Person({
      name,
      status,
    });

    // Save person to database
    const savedPerson = await newPerson.save();

    return res.status(201).json(savedPerson); // Respond with the saved person data
  } catch (error) {
    console.error('Error adding person:', error);
    return res.status(500).json({ error: 'Error adding person' });
  }
}
