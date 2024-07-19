import BlogCard from "@/components/blogCard/blogCard";
import ProfileCard from "@/components/profileCard/profileCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";

const SingleProfilePage = () => {
  return (
    <div className="flex min-h-screen h-full">
        <div className="flex flex-col m-5">
          <div className="flex justify-center items-center">
            <ProfileCard />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
          </div>
        </div>
    </div>
    
    // <div className="flex max-h-screen h-full">
    //   <div className="flex flex-col ">
    //     <div className="">
    //     <ProfileCard />
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
    //       <BlogCard/>
    //       <BlogCard/>
    //       <BlogCard/>
    //       <BlogCard/>
    //       <BlogCard/>
    //       <BlogCard/>
    //     </div>
    //     </div>
    // </div>
  )
}

export default SingleProfilePage;