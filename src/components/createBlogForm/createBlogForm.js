'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateBlogForm = () => {
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("testSubmit");
    router.push("/blog/post");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit">
        <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-72">
          {image && (
            <Image 
              src={image} 
              alt="Menu"
              layout="fill" 
              className="w-full h-full object-cover rounded-md" 
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <label className="text-white text-sm bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition duration-300">
              Upload image
              <input
                type="file"
                name="image"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
        
        <div className="flex flex-col w-full h-full p-5 gap-5">
          <div className="flex flex-col gap-0.5">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-700"
              />
            </div>

            <div className="flex items-center text-base md:text-lg mb-2 md:mb-4">
              <select
                className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="General">General</option>
                <option value="Knowledge">Knowledge</option>
                <option value="News">News</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex h-full w-full text-base md:text-lg">
              <textarea
                type="text"
                placeholder="Description"
                minLength={20}
                className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 lg:h-48 placeholder-zinc-700"
              />
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

        <div className="flex justify-center px-5 pb-5">
          <button
            type="submit"
            className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800"
          >
            CREATE BLOG
          </button>
        </div>  
      </form>
    </div>
  );
};

export default CreateBlogForm;
