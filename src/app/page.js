import BlogCard from "@/components/blogCard/blogCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";
import Link from "next/link";


export default function Home() {
  
  return (
    <div className="flex min-h-screen h-full">
      <div className="flex flex-col m-5">
        <div className="flex flex-row gap-3 justify-end">
          <SearchBlog />
          <SearchCategory />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <Link
            href="/blog/post">
            <BlogCard/>
          </Link>
          <Link
            href="/blog/post">
            <BlogCard/>
          </Link>
          <Link
            href="/blog/post">
            <BlogCard/>
          </Link>
          <Link
            href="/blog/post">
            <BlogCard/>
          </Link>

          
          
        </div>
        </div>
    </div>
      
  );
}
