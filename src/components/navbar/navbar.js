'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRefresh = (e) => {
    e.preventDefault();
    router.refresh();
    router.push('/');
  };

  const [user, setUser] = useState({});

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
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  return (
    <div className="flex justify-between items-center px-5 py-3 h-16 shadow-b-md bg-white sticky top-0 z-50">
      <Link href="/" onClick={handleRefresh} className="text-3xl font-bold">
        SIMPLEBLOG
      </Link>
      <div>
        {!session ? (
          <Link href="/login" className="text-base font-medium">
            Login
          </Link>
        ) : (
          <Link
            href="/profile"
            className="relative flex justify-center items-center border rounded-full overflow-hidden w-10 h-10"
          >
            <Image
              src={user.img || "/noavatar.png"}
              alt="User profile picture"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
