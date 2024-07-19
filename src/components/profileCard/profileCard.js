'use client'

import { useState } from "react";
import Image from "next/image";
import { typeResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface.js';
import Link from "next/link";

const ProfileCard = () => {
  const [user, setUser] = useState({
    username: "john_doe",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123-456-7890"
  });

  const handleLogout = () => {
    console.log("Logout test")
  }

  return (
    <div className="flex flex-col w-full drop-shadow	">
      <div className="flex flex-col bg-white p-5">
      <Link href="/editProfile" className="self-end text-sm md:text-base lg:text-base font-medium hover:font-semibold hover:text-blue-500">Edit</Link>
        <div class="h-fit my-2 flex flex-row self-center">
            <div className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:gap-20 xl:gap-24 md:mx-8 lg:mx-2 px-1">
              <div className="relative border rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <Image 
                  src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w" 
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="Profile picture"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl  ">
                  <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36 ">Username</label>
                  <input
                    type='text'
                    name="username"
                    value={user.username}
                    disabled
                    className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                  />
                </div>
                
                <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl  ">
                  <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36 ">Name</label>
                  <input
                    type='text'
                    name="name"
                    value={user.name}
                    disabled
                    className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                  />
                </div>
                
                <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl  ">
                  <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36 ">Surname</label>
                  <input
                    type='text'
                    name="surname"
                    value={user.surname}
                    disabled

                    className="font-medium text-sm sm:text-xl  w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                  />
                </div>
                
                <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl  ">
                  <label className="font-semibold text-sm sm:text-xl  w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36 ">Email</label>
                  <input
                    type='email'
                    name="email"
                    value={user.email}
                    disabled
                    className="font-medium text-sm sm:text-xl  w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                  />
                </div>
                
                <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl  ">
                  <label className="font-semibold text-sm sm:text-xl  w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36 ">Phone</label>
                  <input
                    type='text'
                    name="phone"
                    value={user.phone}
                    disabled

                    className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                  />
                </div>
                
                
                </div>

                </div>
          
            
          

          <div className="flex flex-col  justify-end items-end h-fit text-sm lg:text-base w-1/12">
              
              
          </div>
          
        </div>
      <Link onClick={handleLogout} href="/" className="self-end text-sm md:text-base lg:text-base font-medium hover:font-semibold hover:text-red-500">Logout</Link>


      </div>
      
    </div>

  );
};

export default ProfileCard;
