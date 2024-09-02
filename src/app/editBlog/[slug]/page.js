'use client'

import Writer from "@/components/writer/writer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PopupBox from "@/components/popupBox/popupBox";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

const EditBlogPage = ({params}) => {
  const { slug } = params;
  const router = useRouter()

  const [postData, setPostData] = useState("")

  // New Data of Post

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [newImg, setNewImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [prevImgUrl, setPrevImgUrl] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      getPostById(slug);
    }
  }, [slug]);

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
        setNewImg(data.post.img)
        setPrevImgUrl(data.post.img);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImg(file);
      setImagePreview(URL.createObjectURL(file)); // Create a local URL for image preview
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploading) {
      setError('Image is still uploading. Please wait.');
      return;
    }

    try {
      let imgUrl = prevImgUrl; // Default to previous image if no new image is provided

      if (newImg) {
        setUploading(true);
        const imgRef = ref(storage, `blogs/${newImg.name}`);
        await uploadBytes(imgRef, newImg);
        imgUrl = await getDownloadURL(imgRef);
        
        // Delete the previous image if it exists
        if (prevImgUrl) {
          const prevImgRef = ref(storage, prevImgUrl);
          await deleteObject(prevImgRef);
        }

        setUploading(false);
      }

      const res = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newCategory, newDesc, newImg: imgUrl }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the post");
      }

      router.refresh(); // Refresh the page after successful update
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit">
        <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-72">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="post image"
              layout="fill"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <Image 
              src={postData.img}
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
                onChange={handleImgChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col w-full h-full p-5 gap-5">
          <div className="flex flex-col gap-0.5">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-400"
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <select
              className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              <option value="General">General</option>
              <option value="Knowledge">Knowledge</option>
              <option value="News">News</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>

            <textarea
              placeholder="Description"
              minLength={10}
              value={newDesc}
              className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 min-h-80 lg:min-h-48 placeholder:text-zinc-400"
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-sm md:text-base font-medium text-red-500 hover:underline cursor-pointer"
              onClick={handleOpenPopup}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="flex flex-row px-5 pb-5 gap-5 justify-center">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-white text-zinc-950 text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800"
          >
            Save
          </button>
        </div>
      </form>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PopupBox onClose={handleClosePopup} id={postData._id} data={postData} />
        </div>
      )}
    </div>
  );
}

export default EditBlogPage;