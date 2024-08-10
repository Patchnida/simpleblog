'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CreateBlogForm = () => {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const getUser = async () => {
    if (!session) return;

    try {
        const res = await fetch("/api/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.accessToken}`, // Optional based on how your session token is structured
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUser(data.user);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
      if (session) {
          getUser();
      }
  }, [session]);
  
  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImagePreview(imageUrl);

      // Revoke the URL on cleanup
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ Refresh เมื่อกด submit

    if (!title || !category) {
      alert("Title and category are required");
      return;
    }

    const writer = session?.user?.username;

    try {
      const res = await fetch("http://localhost:3000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ title, category, desc, writer }),
      });

      if (res.ok) {
        console.log("Post created successfully");
        router.push("/")
      } else {
        console.log("Failed to create blog post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit">
        <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-72">
          {imagePreview && (
            <Image 
              src={imagePreview} 
              alt="Menu"
              layout="fill"
              objectFit="cover"
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
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-700"
              />
            </div>

            <div className="flex items-center text-base md:text-lg mb-2 md:mb-4">
              <select
                name="category"
                className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                name="desc"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 lg:h-48 placeholder-zinc-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
              <Image 
                src={session?.user?.image || "/noavatar.png"}
                layout="fill"
                objectFit="cover"
                alt="Writer's picture"
              />
            </div>
            <p className="text-sm md:text-base font-medium">{session?.user?.username || "Writer"}</p>
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
