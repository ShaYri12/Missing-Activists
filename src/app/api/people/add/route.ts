import connectMongoDB from '../../db';
import Person from '../../models/person'; // Adjust the import path as per your project structure
import { NextApiResponse } from 'next';

interface IRequest {
  json: () => Promise<{ name: string; status: 'Missing' | 'Found' | 'Deceased' }>;
}


export async function postHandler(request: IRequest, response: NextApiResponse) {
  try {
    const { name, status } = await request.json();

    await connectMongoDB(); // Assuming this function sets up MongoDB connection

    // Create a new person document
    const newPerson = await Person.create({ name, status });

    // Respond with success message and status code 201
    return response.status(201).json({ message: 'Person Created', data: newPerson });
  } catch (error: any) {
    console.error('Failed to create person:', error);
    return response.status(500).json({ error: 'Failed to create person' });
  }
}
