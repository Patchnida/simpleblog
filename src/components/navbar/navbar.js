import Link from "next/link";

const NavBar = () => {
  return (
          <div className="flex justify-between items-center px-5 py-3 h-16 shadow-b-md bg-white sticky top-0 z-50">
            <Link href="/" className=" text-3xl font-bold">SimpleBlog</Link>
            <Link href="/login" className="text-base font-medium">Login</Link>
          </div>  
  )
}

export default NavBar;
