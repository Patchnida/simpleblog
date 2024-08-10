import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDb();

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findById(token.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { name, surname, phone, img } = await req.json();
    
    await connectToDb();

    const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findByIdAndUpdate(
      token.sub,
      { name, surname, phone, img },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error occurred while updating the profile.", error);
    return NextResponse.json({ message: "An error occurred while updating the profile." }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const { newUsername: username, 
            newName: name,
            newSurname: surname,
            newEmail: email,
            newPhone: phone } = await req.json();
    
    await connectToDb();

    const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findByIdAndUpdate(
      token.sub,
      { username, name, surname, email, phone },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error occurred while updating the profile.", error);
    return NextResponse.json({ message: "An error occurred while updating the profile." }, { status: 500 });
  }
}