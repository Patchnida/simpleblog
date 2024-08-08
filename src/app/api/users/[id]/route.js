import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDb();
  const user = await User.findById({_id: id});
  return NextResponse.json({user},{status:200})
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { username, name, surname, email, phone } = await req.json();
  await connectToDb();
  const updatedUser = await User.findByIdAndUpdate(id, { username, name, surname, email, phone }, { new: true });
  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User updated", user: updatedUser });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectToDb();
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
