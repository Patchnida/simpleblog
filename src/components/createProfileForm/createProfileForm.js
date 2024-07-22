"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProfileForm = (e) => {
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // [0] เป็นการเลือกไฟล์แรกจากรายการไฟล์ที่ถูกเลือก ซึ่งในกรณีนี้สมมุติว่าผู้ใช้เลือกเพียงไฟล์เดียว.
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("test submit")
        router.push("/")
    }

  return (
    <div className="w-full min-w-80 flex justify-center items-center bg-white shadow p-4">
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 py-4 md:gap-10 lg:gap-10 md:py-10" >
                <h1 className="text-2xl md:text-5xl font-bold text-center">Create Profile</h1>
                
                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10">
                   
                <div className="relative flex justify-center items-center border rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-64 lg:h-64">
                        <Image
                            src={image || "/noavatar.png"}
                            fill
                            style={{ objectFit: 'cover' }}
                            alt="Profile picture"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
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
                

                    <div className="flex flex-col justify-start self-center w-full lg:w-7/12 gap-2 md:gap-4">
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16  ">Username</label>
                            <input 
                                type="text"
                                placeholder="Username"
                                name="username"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16  ">Name</label>
                            <input 
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72  focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16  ">Surname</label>
                            <input 
                                type="text"
                                placeholder="Surname"
                                name="surname"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16  ">Email</label>
                            <input 
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16  ">Phone</label>
                            <input 
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                        </div>
                        
                    </div>
                </div>

                <button type="submit" className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full max-w-72 lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800">CREATE PROFILE</button>

            </form>
    </div>
  )
}

export default CreateProfileForm;
