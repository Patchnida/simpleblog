'use client'

import BlogCard from "@/components/blogCard/blogCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [postData, setPostData] = useState([]);


  const getPosts = async () => {
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
    getPosts(); // เรียกใช้ getPosts
  },[])

  

  return (
    <div className="flex min-h-screen h-full">
      <div className="flex flex-col m-5">
        <div className="flex flex-row gap-3 justify-end">
          <SearchBlog />
          <SearchCategory />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {postData && postData.length>0 ? (
            postData.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                passHref
              >
                
                  <BlogCard post={post} />
                
              </Link>
            ))
          ) : (
            <p> You do not have any post yet </p>
          )}

          
        </div>
        </div>
    </div>
      
  );
}
