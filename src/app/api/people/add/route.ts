import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../db';
import Person, { IPerson } from '../../models/Person';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      name,
      gender,
      age,
      images,
      nationality,
      phoneNumber,
      occupation,
      lastSeen,
      timeSeen,
      otherDetails,
      contact1,
      contact2,
    } = body;

    // Validate input if needed
    if (!name || !gender || !age || !images || !nationality || !phoneNumber || !occupation || !lastSeen || !timeSeen || !otherDetails || !contact1 || !contact2) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create new person instance
    const newPerson: IPerson = new Person({
      name,
      gender,
      age,
      images,
      status: 'Missing',
      nationality,
      phoneNumber,
      occupation,
      lastSeen,
      timeSeen,
      otherDetails,
      contact1,
      contact2,
    });

    // Save person to database
    const savedPerson = await newPerson.save();

    return NextResponse.json(savedPerson, { status: 201 }); // Respond with the saved person data
  } catch (error) {
    console.error('Error adding person:', error);
    return NextResponse.json({ error: 'Error adding person' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
}
