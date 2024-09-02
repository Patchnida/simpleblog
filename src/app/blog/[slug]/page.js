'use client'

import Writer from "@/components/writer/writer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const SingleBlogPage = ({params}) => {
  const { data: session } = useSession();

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
        <div className="w-full h-full">
            <div className="flex flex-col w-full h-fit">
              <div className="relative w-full">
                <div className="relative w-full h-44 sm:h-64 md:h-80">
                  <Image 
                    src={postData.img}
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    alt="Image description"
                  />
                  {postData.writer === session?.user?.username && (
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
                  )}
                </div>
              </div>
              
              <div className="flex flex-col w-full h-full p-5 md:p-8">
                <div className="">
                      <h2 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-4">{postData.title}</h2>
                      <div className="flex items-center text-base md:text-xl mb-2 md:mb-4">
                        <p className="font-semibold mr-2">Category : {postData.category}</p>
                      </div>
                      <div className="flex h-full ">
                        <p className="font-semibold w-full break-words" >{postData.desc}</p>
                      </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                  
                  <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
                    <Image 
                      src={postData.image || "/noavatar.png"}
                      layout="fill"
                      objectFit="cover"
                      alt="Writer's picture"
                    />
                  </div>
                  <p className="text-sm md:text-base font-medium">{postData.writer || "Writer"}</p>
                </div>
              </div>  
                
              </div>
        </div>
  );
}

export default SingleBlogPage;
