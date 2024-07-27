import Writer from "@/components/writer/writer";
import Image from "next/image";
import Link from "next/link";

// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)

//   if(!res.ok) {
//     throw new Error('Something went wrong')
//   }

//   return res.json()
// }

const SingleBlogPage = async ({params}) => {
  
  const {slug} = params;
  // const post = await getData(slug)
  

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
                      href="/editBlog">
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
                      <h2 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-4">Title test</h2>
                      <div className="flex items-center text-base md:text-xl mb-2 md:mb-4">
                        <p className="font-semibold mr-2">Category :</p>
                        <p className="font-semibold" >test</p>
                      </div>
                      <div className="flex h-full">
                        {/* <p className="text-sm sm:text-base mb-6 leading-relaxed">
                          {post.body}
                        </p> */}
                        <p className="text-sm sm:text-base mb-6 leading-relaxed">
                          test desc
                        </p>
                      </div>
                  </div>
                  
                  {/* <Writer userId={post.userId} /> */}
              </div>  
                
              </div>
        </div>
  );
}

export default SingleBlogPage;
