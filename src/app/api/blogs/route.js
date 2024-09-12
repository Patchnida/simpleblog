import connectToDb from "@/lib/mongoDB";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, category, desc, writer, img, writerImg } = await request.json();
    console.log("Received data:", { title, category, desc, writer, img, writerImg });

    await connectToDb();
    await Post.create({ title, category, desc, writer, img, writerImg });
    return NextResponse.json({ message: "Post created" }, { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  await connectToDb();
  const posts = await Post.find({});
  return NextResponse.json({ posts }); 
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectToDb();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
