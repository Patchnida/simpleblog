"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

const EditProfileForm = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});

  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [error, setError] = useState("");
  const [newImg, setNewImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const router = useRouter();

  const getUser = async () => {
    if (!session) return;

    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await res.json();
      setUserData(data.user);

      setNewName(data.user.name);
      setNewSurname(data.user.surname);
      setNewPhone(data.user.phone);
      setNewImg(data.user.img);
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
    // Update image preview only if newImg is a valid image file
    if (newImg && newImg instanceof File && newImg.type.startsWith("image/")) {
      const imgUrl = URL.createObjectURL(newImg);
      setImgPreview(imgUrl);

      return () => URL.revokeObjectURL(imgUrl); // Clean up URL object when no longer needed
    } else {
      setImgPreview(null); // If no image, set preview to null
    }
  }, [newImg]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setNewImg(file); // Update image if valid
      } else {
        setError("Please select a valid image file."); // Show error if not an image
        setNewImg(null); // Reset image if invalid
      }
    } else {
      setNewImg(null); // Reset image if none selected
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploading) {
      setError("Image is still uploading. Please wait.");
      return;
    }

    try {
      let imgUrl = userData.img;
      if (newImg) {
        setUploading(true);
        try {
          const imgRef = ref(storage, `profiles/${newImg.name}`);
          await uploadBytes(imgRef, newImg);
          imgUrl = await getDownloadURL(imgRef);
        } catch (error) {
          setError("Failed to upload image");
          return;
        } finally {
          setUploading(false);
        }
      }

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          newName,
          newSurname,
          newPhone,
          newImg: imgUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      router.push("/profile");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleCancel = () => {
    router.push(`/profile`);
  };

  return (
    <div className="w-full min-w-80 flex justify-center items-center bg-white shadow p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-6 py-4 md:gap-10 lg:gap-10 md:py-10"
      >
        <h1 className="text-2xl md:text-5xl font-bold text-center">Edit Profile</h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10">
          <div className="relative flex justify-center items-center border rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-64 lg:h-64">
            <Image
              src={imgPreview || userData.img || "/noavatar.png"}
              fill
              style={{ objectFit: "cover" }}
              alt="Profile picture"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
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

          <div className="flex flex-col justify-start self-center w-full lg:w-7/12 gap-2 md:gap-4">
            <div className="flex flex-row items-center justify-center w-full">
              <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                value={userData.username}
                disabled
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                Surname
              </label>
              <input
                type="text"
                placeholder="Surname"
                name="surname"
                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                value={newSurname}
                onChange={(e) => setNewSurname(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                value={userData.email}
                disabled
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm md:text-xl text-center">{error}</p>
        )}

        <div className="flex w-full justify-center">
          <div className="flex flex-row px-5 pb-5 gap-5 justify-center w-8/12">
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
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
