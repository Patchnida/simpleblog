"use client"

import Link from "next/link";
import { useState } from "react";
import { CreateBlog } from '@/components/createBlog/createBlog';

const RegisterForm = () => {

  return (
    <div className="w-full lg:max-w-2xl">
        <div className="flex flex-col justify-center items-center bg-white w-full px-2 md:px-10 py-8 md:py-12 lg:py-14 gap-4 md:gap-5 lg:gap-4 shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Register</h1>

            <div className="flex flex-col gap-3 md:gap-4 lg:gap-3 w-11/12 self-center">
                <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-base lg:text-sm font-medium text-zinc-400  ">Username</label>
                    <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-base lg:text-sm font-medium text-zinc-400  ">Email</label>
                    <input 
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-base lg:text-sm  font-medium text-zinc-400  ">Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-base lg:text-sm  font-medium text-zinc-400  ">Password Repeat</label>
                    <input 
                        type="password"
                        placeholder="Password Repeat"
                        name="passwordRepeat"
                        className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                    />
                </div>
                
                
            </div >
            
            <button className="bg-zinc-950 text-white text-sm md:text-lg lg:text-base font-medium py-2 w-11/12 border flex justify-center items-center self-center my-1 hover:shadow hover:bg-zinc-800">REGISTER</button>
            <div>
                <p className="text-xs sm:text-sm md:text-base font-normal">Already have an account?  
                    <Link href="/login" className="font-semibold ml-1 hover:underline hover:text-green-500">Login</Link> 
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default RegisterForm;
