import Image from "next/image";
import Link from "next/link";

const SingleBlogPage = () => {
  // Temporary Data
  const Category = "Tech";

  const text = `IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM. IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM.
  IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM. IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM.
  IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM. IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM.`

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
                      <h2 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-4">Title</h2>
                      <div className="flex items-center text-base md:text-xl mb-2 md:mb-4">
                        <p className="font-semibold mr-2">Category :</p>
                        <p className="font-semibold" >{Category}</p>
                      </div>
                      <div className="flex h-full">
                        <p className="text-sm sm:text-base mb-6 leading-relaxed">
                          {text}
                        </p>
                      </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
                      <Image 
                        src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w" 
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Writer's picture"
                      />
                    </div>
                    <p className="text-sm md:text-base font-medium">Writer</p>
                  </div>
              </div>  
                
              </div>
        </div>
  );
}

export default SingleBlogPage;
