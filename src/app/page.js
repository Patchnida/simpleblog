import BlogCard from "@/components/blogCard/blogCard";
import SearchBlog from "@/components/searchBlog/searchBlog";
import SearchCategory from "@/components/searchCategory/searchCategory";
import Link from "next/link";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')

  if(!res.ok) {
    throw new Error('Something went wrong')
  }

  return res.json()
}

const Home = async () => {

  const posts = await getData()

  return (
    <div className="flex min-h-screen h-full">
      <div className="flex flex-col m-5">
        <div className="flex flex-row gap-3 justify-end">
          <SearchBlog />
          <SearchCategory />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              passHref
            >
              
                <BlogCard post={post} />
              
            </Link>
          ))}

          
        </div>
        </div>
    </div>
      
  );
}
export default Home;