import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-white w-full h-16 shadow-b-md fixed top-0 z-50">
        <div className="flex justify-between items-center mx-5 my-0 py-3 w-auto">
            <Link href="/" className=" text-3xl font-bold">SimpleBlog</Link>
            <Link href="/login" className="text-base font-medium">Login</Link>
        </div>
    </div>
    
  )
}

export default NavBar;