import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDb();

    const user = await User.create({ username, email, password: hashedPassword });

    console.log("User created:", user);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error occurred while registering the user:", error);
    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  }
}
