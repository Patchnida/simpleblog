'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  const router = useRouter()

  const getUser = async () => {
    if (!session) return;

    try {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session.accessToken}`, // Optional based on how your session token is structured
        },
        cache: "no-store"
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

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/")
    } catch (error) {
      console.log("Error logging out:", error);
    }
    // localStorage.removeItem("token");
    
  };

  return (
    <div className="flex flex-col w-full drop-shadow">
      <div className="flex flex-col bg-white p-5">
        <Link href="/editProfile" className="self-end text-sm md:text-base lg:text-base font-medium hover:font-semibold hover:text-blue-500">Edit</Link>
        <div className="h-fit my-2 flex flex-row self-center">
          <div className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:gap-20 xl:gap-24 md:mx-8 lg:mx-2 px-1">
            <div className="relative border rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <Image
                src={user.img || "/noavatar.png"}
                fill
                style={{ objectFit: 'cover' }}
                alt="Profile picture"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl">
                <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36">Username</label>
                <input
                  type='text'
                  name="username"
                  value={user.username || ''}
                  disabled
                  className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                />
              </div>

              <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl">
                <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36">Name</label>
                <input
                  type='text'
                  name="name"
                  value={user.name || ''}
                  disabled
                  className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                />
              </div>

              <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl">
                <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36">Surname</label>
                <input
                  type='text'
                  name="surname"
                  value={user.surname || ''}
                  disabled
                  className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                />
              </div>

              <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl">
                <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36">Email</label>
                <input
                  type='email'
                  name="email"
                  value={user.email || ''}
                  disabled
                  className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                />
              </div>

              <div className="flex flex-row h-12 md:h-14 lg:h-16 items-center text-base md:text-xl lg:text-xl">
                <label className="font-semibold text-sm sm:text-xl w-24 md:w-32 lg:w-36 mr-4 sm:mr-24 md:mr-36 lg:mr-16 xl:mr-36">Phone</label>
                <input
                  type='text'
                  name="phone"
                  value={user.phone || ''}
                  disabled
                  className="font-medium text-sm sm:text-xl w-36 sm:w-56 md:w-56 lg:w-64 xl:w-96 px-2 p-1 md:p-1 lg:p-2"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="self-end text-sm md:text-base lg:text-base font-medium hover:font-semibold hover:text-red-500" onClick={handleLogout}>
                Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
