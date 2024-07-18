import Image from "next/image";

const SingleBlogPage = () => {
  // Temporary Data
  const Category = "Tech";

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-80">
        <Image 
          src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w" 
          fill
          style={{ objectFit: 'cover' }}
          alt="Image description"
        />
      </div>
      <div className="mx-5 mt-5 md:mx-7 md:mt-7 lg:mx-10 lg:mt-10">
        <h2 className="text-4xl font-semibold mb-4">Title</h2>
        <div className="flex items-center text-xl mb-4">
          <p className="font-semibold mr-2">Category :</p>
          <p className="font-semibold" >{Category}</p>
        </div>
        <p className="text-base mb-6 leading-relaxed">
          IT LOOKS LIKE YOU ARE TRYING TO UPDATE YOUR NEXT.JS PROJECT TO USE THE NEW NEXT/IMAGE COMPONENT FROM VERSION 13, BUT RUNNING THE CODEMODS RESOLVE THE ISSUE. HERE ARE SOME STEPS TO MANUALLY FIX THE PROBLEM.
        </p>
        <div className="flex items-center justify-end ">
          <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
            <Image 
              src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w" 
              fill
              style={{ objectFit: 'cover' }}
              alt="Writer's picture"
            />
          </div>
          <p className="text-base font-medium">Writer</p>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
