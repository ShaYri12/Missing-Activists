import dbConnect from "../db";
import Person from "../models/Person";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || '';

  try {
    const query = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { gender: { $regex: `^${searchTerm}`, $options: 'i' } },
            { nationality: { $regex: searchTerm, $options: 'i' } },
            { occupation: { $regex: searchTerm, $options: 'i' } },
            { lastSeen: { $regex: searchTerm, $options: 'i' } },
            { otherDetails: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const persons = await Person.find(query);
    return NextResponse.json(persons);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
