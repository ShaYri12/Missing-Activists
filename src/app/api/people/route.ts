import dbConnect from "../db";
import Person from "../models/Person";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const persons = await Person.find({});
    return NextResponse.json(persons);
  } catch (err: any) {
    return NextResponse.json(err.message);
  }
}
