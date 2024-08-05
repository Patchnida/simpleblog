import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await connectToDb();
    
        const { email, username } = await req.json();
    
        let user = null;

        if (username) {
            user = await User.findOne({ username }).select("_id");
            if (user) {
              return NextResponse.json({ user, message: "Username already exists!" });
            }
          }

        if (email) {
          user = await User.findOne({ email }).select("_id");
          if (user) {
            return NextResponse.json({ user, message: "Email already exists!" });
          }
        }
        
        return NextResponse.json({ user: null, message: "User does not exist" });
    
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
      }
}