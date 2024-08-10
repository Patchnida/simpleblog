'use client'

import BlogCard from "@/components/blogCard/blogCard";
import ProfileCard from "@/components/profileCard/profileCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen h-full">
        <div className="flex flex-col m-5">
          <div className="flex justify-center items-center">
            <ProfileCard />
          </div>
          <div className="flex flex-row justify-end items-center my-5 gap-3">
            <SearchBlog/>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
          </div>
        </div>
    </div>
  )
}

export default ProfilePage;