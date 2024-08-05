'use client'

import Writer from "@/components/writer/writer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EditBlogForm from "@/components/editBlogForm/editBlogForm";
import PopupBox from "@/components/popupBox/popupBox";

const EditBlogPage = ({params}) => {

  const { slug } = params;

  const [postData, setPostData] = useState("")

  // New Data of Post

  const [newTitle, setNewTitle] = useState("");

  const [newImg, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");

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
        console.log("edit post", data)
        setPostData(data.post)

        setNewTitle(data.post.title);
        setNewCategory(data.post.category);
        setNewDesc(data.post.desc);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (slug) {
      getPostById(slug);
    }
  }, [slug]);

  const [image, setImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) { // check ว่า file ที่รับมาเป็น null หรือ undefied หรือไม่
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }
  
  const handleOpenPopup = () => {
    console.log("test open popup");
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newCategory, newDesc}),
      });

      if(!res.ok) {
        throw new Error("Failed to update post")
      }

      router.refresh() // เมื่อ update เสร็จให้ refresh web page
      router.push(`/blog/${slug}`)

    } catch (error) {
      console.log(error);
    }   
  }

  const handleCancle = () => {
    console.log("test cancle");
    router.push(`/blog/${slug}`)
}

  // useEffect(() => {
  //   if (formSubmitted) {
  //     router.push('/blog/post');
  //   }
  // }, [formSubmitted, router]);

  return (
    <div className="w-full h-full">
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit">
      <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-72">
      {image ? (
        <Image 
          src={image} 
          alt="Menu"
          layout="fill" 
          className="w-full h-full object-cover rounded-md" 
        />
      ) : (
        <Image 
          src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w"
          alt="Default"
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
          <div className="">
            <input
              type="text"
              placeholder={postData.title}
              defaultValue={postData.title}
              className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-400"
              onChange={(e)=>setNewTitle(e.target.value)}
            />
          </div>

          <div className="flex items-center text-base md:text-lg mb-2 md:mb-4">
            <select
              className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
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
              placeholder={postData.desc}
              minLength={10}
              defaultValue={postData.desc}
              className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 min-h-80 lg:min-h-48 placeholder:text-zinc-400"
              onChange={(e)=>setNewDesc(e.target.value)}>

            </textarea>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button 
          type="button"
            className="text-sm md:text-base font-medium text-red-500 hover:underline cursor-pointer"
            onClick={handleOpenPopup}
          >Delete
          </button>
        </div>
      </div>

      {/* <div className="flex justify-center px-5 pb-5">
        <button
          type="submit" 
          className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800">Save</button>
      </div> */}
      
      <div className="flex flex-row px-5 pb-5 gap-5 justify-center">
        <button
          type="button"
          onClick={handleCancle}
          className="bg-white text-zinc-950 text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-100"
        >Cancle</button>
        <button
            type="submit" 
            className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800">Save</button>
      </div>    
        
      </form>
    {isPopupOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <PopupBox onClose={handleClosePopup} id={postData._id}/>
      </div>
    )
    

    }
</div>
  );
}

export default EditBlogPage;