'use client'

import BlogCard from "@/components/blogCard/blogCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [postData, setPostData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const filteredPosts = postData.filter((post) =>
    post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const filteredCategory = selectedCategory === "All"
    ? filteredPosts
    : filteredPosts.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex min-h-screen h-full w-full">
        <div className="flex flex-col m-5 w-full">
          <div className="flex flex-row gap-3 justify-end">
            <SearchBlog searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <SearchCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <Link href={"/createBlog"}>
              <button
                className="bg-zinc-950 p-0 text-white  leading-none border rounded-3xl w-10 h-10 min-w-10 min-h-10 flex justify-center items-center hover:shadow hover:bg-zinc-800">
                <p className="flex font-bold text-center self-center">+</p>
              </button>
            </Link>
          </div>

          <div className="h-full">
          {filteredCategory && filteredCategory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full h-full">
              {filteredCategory.map((post) => (
                <Link key={post._id} href={`/blog/${post._id}`} passHref>
                  <div className="h-full">
                    <BlogCard post={post} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <p className="w-fit h-fit font-medium text-zinc-500 text-center">Do not have any post</p>
            </div>
          )}
          </div>

        </div>
    </div>
      
  );
}
