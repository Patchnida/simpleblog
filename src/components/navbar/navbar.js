'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const router = useRouter()

  const handleRefresh = (e) => {
    e.preventDefault();
    router.refresh();
    router.push('/')
  };

  return (
          <div className="flex justify-between items-center px-5 py-3 h-16 shadow-b-md bg-white sticky top-0 z-50">
            <Link href="/" onClick={handleRefresh} className=" text-3xl font-bold">SimpleBlog</Link>
            <Link href="/login" className="text-base font-medium">Login</Link>
            <a className="text-base font-medium" onClick={() => signOut()}>Logout</a>
          </div>  
  )
}

export default NavBar;
