'use client'

import Writer from "@/components/writer/writer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const SingleBlogPage = ({params}) => {
  
  const { slug } = params;
  console.log(slug)
  

  const [postData, setPostData] = useState("")

  const router = useRouter()

  const getPostById = async (slug) => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${slug}`,{
        method: "GET",
        cache: "no-store",
      })

      if(!res.ok) {
        throw new Error("Failed to fetch a post")
      }

      const data = await res.json();
        console.log("watch post", data)
        setPostData(data.post)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (slug) {
      getPostById(slug);
    }
  }, [slug]);

  return (
        <div>
            <div className="flex flex-col w-full h-fit">
              <div className="relative w-full">
                <div className="relative w-full h-44 sm:h-64 md:h-80">
                  <Image 
                    src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w" 
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    alt="Image description"
                  />
                  <div className="absolute top-0 right-0 w-5 h-5 md:w-8 md:h-8 m-2 shadow cursor-pointer">
                    <Link
                      href={`/editBlog/${slug}`}>
                      <Image 
                        src="/edit.png"
                        layout="fill"
                        alt="edit button"
                        className="object-contain"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col w-full h-full p-5 md:p-8">
                <div className="">
                      {/* <h2 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-4">{post.title}</h2> */}
                      <h2 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-4">{postData.title}</h2>
                      <div className="flex items-center text-base md:text-xl mb-2 md:mb-4">
                        <p className="font-semibold mr-2">Category : {postData.category}</p>
                      </div>
                      <div className="flex h-full">
                        <p className="font-semibold" >{postData.desc}</p>
                      </div>
                  </div>
                  
                  {/* <Writer userId={post.userId} /> */}
              </div>  
                
              </div>
        </div>
  );
}

export default SingleBlogPage;
