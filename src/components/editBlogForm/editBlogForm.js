'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PopupBox from "../popupBox/popupBox";
import DeleteBtn from "../deleteBtn/deleteBtn";

const EditBlogForm = ({params}) => {
  const [image, setImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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
        console.log("edit post", data)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("testSubmit");
    setFormSubmitted(true);    
  }

  // useEffect(() => {
  //   if (formSubmitted) {
  //     router.push('/blog/post');
  //   }
  // }, [formSubmitted, router]);
  

  return (
    <div>
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
                      placeholder="Title"
                      defaultValue={title}
                      className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-700"
                    />
                  </div>

                  <div className="flex items-center text-base md:text-lg mb-2 md:mb-4">
                    <select
                      className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
                    //   value={selectedCategory}
                      defaultValue={Category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="option1">General</option>
                      <option value="option2">Knowledge</option>
                      <option value="option3">News</option>
                      <option value="option4">Entertainment</option>
                      <option value="option5">Others</option>
                    </select>
                  </div>

                  <div className="flex h-full w-full text-base md:text-lg">
                    <textarea
                      type="text"
                      placeholder="Description"
                      minLength={20}
                      defaultValue={text}
                      className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 min-h-80 lg:min-h-48 placeholder-zinc-700">

                    </textarea>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <DeleteBtn />
                </div>
              </div>

              <div className="flex justify-center px-5 pb-5">
                <button
                  type="submit" 
                  className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800">Save</button>
              </div>  
                
              </form>
            {isPopupOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <PopupBox onClose={handleClosePopup} id={post._id}/>
              </div>
            )
            

            }
        </div>
  )
}

export default EditBlogForm;