import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../db';
import Person from '../../models/Person';

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Connect to your database

    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid ID in request body' }, { status: 400 });
    }

    const person = await Person.findById(id);

    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json({ person }, { status: 200 });
  } catch (error) {
    console.error('Error fetching person:', error);
    return NextResponse.json({ error: 'Error fetching person' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      id,
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
      status,
    } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid ID in request body' }, { status: 400 });
    }

    // Validate input if needed
    if (!name || !gender || !age || !images || !nationality || !phoneNumber || !occupation || !lastSeen || !timeSeen || !otherDetails || !contact1 || !contact2) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const updatedPerson = await Person.findByIdAndUpdate(id, {
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
      status,
    }, { new: true, runValidators: true });

    if (!updatedPerson) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json({ person: updatedPerson }, { status: 200 });
  } catch (error) {
    console.error('Error updating person:', error);
    return NextResponse.json({ error: 'Error updating person' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid ID in request body' }, { status: 400 });
    }

    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Person deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json({ error: 'Error deleting person' }, { status: 500 });
  }
}

// OPTIONS handler
export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST, PUT, DELETE' } });
}