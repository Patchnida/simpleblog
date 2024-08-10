'use client'

import BlogCard from "@/components/blogCard/blogCard";
import ProfileCard from "@/components/profileCard/profileCard";
import SearchBlog from "@/components/searchBlog/searchBlog";

import Link from 'next/link';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  
  const [postData, setPostData] = useState([]);

  const getUserPosts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/blogs", {
          method: "GET",
          cache: "no-store" // ไม่จำเป็นต้อง store ข้อมูล เพราะเราต้องการให้ข้อมูลรีใหม่ทุกครั้ง
        })

        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await res.json()
        setPostData(data.posts) // รับเป็น "posts" เข้ามา
        
    } catch (error) {
        console.log("Error loading posts", error);
    }
  }

  useEffect(() => {
    getUserPosts(); 
  },[])

  const filteredPosts = postData.filter((post) =>
    post.writer === session?.user?.username
  );

  return (
    <div className="flex min-h-screen h-full">
        <div className="flex flex-col m-5">
          <div className="flex justify-center items-center">
            <ProfileCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.length > 0 ? (
            <>
              <div className="flex flex-row justify-end items-center mt-5 gap-3 w-full col-span-full">
                <Link
                  href="/createBlog"
                  className="bg-zinc-950 text-white font-medium px-5 py-2 border rounded-3xl w-18 md:w-42 flex justify-center items-center hover:shadow hover:bg-zinc-800"
                >
                  <>
                    <p className="md:hidden text-xs">ADD</p>
                    <p className="hidden text-base md:inline">ADD NEW BLOG</p>
                  </>
                </Link>
              </div>
              {filteredPosts.map((post) => (
                <Link key={post._id} href={`/blog/${post._id}`} passHref>
                  <div className="h-full">
                    <BlogCard post={post} />
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="flex flex-col w-full justify-center items-center bg-red-500 ">
              <p className="text-center text-lg font-medium">You do not have any post.</p>
              <Link
                href="/createBlog"
                className="bg-zinc-950 text-white font-medium px-5 py-2 border rounded-3xl w-fit flex justify-center items-center hover:shadow hover:bg-zinc-800 mt-5"
              >
                <>
                  <p className="md:hidden text-xs">ADD</p>
                  <p className="hidden text-base md:inline">ADD NEW BLOG</p>
                </>
              </Link>
            </div>
          )}
        </div>
        </div>
    </div>
  )
}

export default ProfilePage;