'use client';

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";
import Image from "next/image";

const CreateBlogForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');

  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        try {
          const res = await fetch('/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            cache: 'no-store',
          });

          if (!res.ok) throw new Error('Failed to fetch user data');

          const data = await res.json();
          setUser(data.user);
        } catch (error) {
          console.error(error);
          setError('Error fetching user data');
        }
      };

      fetchUser();
    }
  }, [session]);

  useEffect(() => {
    if (img) {
      const imgUrl = URL.createObjectURL(img);
      setImgPreview(imgUrl);

      return () => URL.revokeObjectURL(imgUrl);
    }
  }, [img]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      setError('Title and category are required');
      return;
    }

    if (uploading) {
      setError('Image is still uploading. Please wait.');
      return;
    }

    setError('');
    const writer = session?.user?.username || 'Anonymous';

    try {
      let imgUrl = '';
      if (img) {
        setUploading(true);
        try {
          const imgRef = ref(storage, `blogs/${img.name}`);
          await uploadBytes(imgRef, img);
          imgUrl = await getDownloadURL(imgRef);
        } catch (error) {
          setError('Failed to upload image');
          return;
        } finally {
          setUploading(false);
        }
      }

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ title, category, desc, writer, img: imgUrl }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to create blog post');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    {error && <div className="error">{error}</div>}
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-fit">
      <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-72">
        {imgPreview && (
          <Image 
            src={imgPreview} 
            alt="Image preview"
            fill
            style={{ objectFit: 'cover' }} 
            className="w-full h-full object-cover rounded-md" 
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <label className="text-white text-sm bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition duration-300">
            Upload Image
            <input
              type="file"
              name="img"
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
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 text-xl md:text-3xl lg:font-light mb-2 md:mb-4 border-b focus:outline-none w-full placeholder:text-zinc-700"
          />

          <select
            name="category"
            className="px-3.5 py-2 border-b focus:outline-none w-full h-12"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            <option value="General">General</option>
            <option value="Knowledge">Knowledge</option>
            <option value="News">News</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>

          <textarea
            name="desc"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="px-4 py-2 font-regular border-b focus:outline-none w-full h-36 lg:h-48 placeholder-zinc-700"
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
            <Image 
              src={session?.user?.img || "/noavatar.png"}
              fill
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
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "CREATE BLOG"}
        </button>
      </div>
    </form>
  </div>
  );
};

export default CreateBlogForm;
