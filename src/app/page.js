import BlogCard from "@/components/blogCard/blogCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";


export default function Home() {
  
  return (
      <div className="flex flex-col m-5">
        <div className="flex flex-row gap-3 justify-end">
          <SearchBlog />
          <SearchCategory />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
        </div>
      </div>
  );
}
