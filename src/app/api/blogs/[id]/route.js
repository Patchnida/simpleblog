import connectToDb from "@/lib/mongoDB";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const { id } = params;
    await connectToDb()
    const post = await Post.findOne({_id: id})
    return NextResponse.json({post},{status:200})
}

export async function PUT(req, {params}) {
    const {id} = params;
    const { newTitle: title, 
            newCategory: category,
            newDesc: desc
    } = await req.json() //ดึงค่า newTitle มาแล้วเปลี่ยนเป็น title ใ้ห้ตรงตาม field ใน Database

    await connectToDb()

    await Post.findOneAndUpdate({ _id: id }, {title, category, desc})
    return NextResponse.json({message: "Post updated"}, {status: 200})
    
}