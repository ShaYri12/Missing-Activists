import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../db';
import Admin, { IAdmin } from '../../models/Admin';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input if needed
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Create new admin instance
    const newAdmin: IAdmin = new Admin({
      email,
      password,
    });

    // Save admin to database
    const savedAdmin = await newAdmin.save();

    return NextResponse.json(savedAdmin, { status: 201 }); // Respond with the saved admin data
  } catch (error: any) {
    console.error('Error adding admin:', error);
    return NextResponse.json({ error: 'Error adding admin' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
}
