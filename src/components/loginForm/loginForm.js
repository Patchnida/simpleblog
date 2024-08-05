"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                username, password, redirect:false
            })

            if(res.error) {
                setError("Invalid credentials")
                return
            }

            router.replace("createProfile")

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="w-full min-w-80 lg:max-w-2xl ">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white w-full  px-5 md:px-10 py-14 md:py-36 lg:py-16 gap-5 md:gap-10 lg:gap-7 shadow">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Login</h1>

            <div className="flex flex-col gap-4 md:gap-6 lg:gap-4 w-11/12 md:min-w-96 lg:max-w-xl self-center">
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-zinc-400  ">Username</label>
                    <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="text-base p-2 border md:text-lg focus:outline-none focus:ring-1 focus:ring-zinc-300"
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-zinc-400">Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="text-base p-2 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                        onChange={(e)=> setPassword(e.target.value)}
                    />    
                </div>
            </div>

            {error && (
                <div className="flex justify-center text-red-500">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                className="bg-zinc-950 text-white text-base lg:text-lg font-medium px-5 py-2 w-11/12 lg:py-3 border flex justify-center items-center self-center my-2 hover:shadow hover:bg-zinc-800"
            >LOGIN</button>
            <div>
                <p className="text-xs sm:text-sm md:text-base font-normal">Do not have an account?  
                    <Link href="/register" className="font-semibold ml-1 hover:underline hover:text-blue-500">Register</Link> 
                </p>
                
            </div>
        </form>
    </div>
  )
}

export default LoginForm;
