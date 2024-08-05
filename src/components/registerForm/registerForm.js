"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';


const RegisterForm = () => {

    const router = useRouter();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    console.log(username, email, password, confirmPassword);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            setError("Password do not match!")
            return;
        }

        if(!username || !email || !password || !confirmPassword) {
            setError("Please complete all inputs!")
            return;
        }

        try {
            const resCheckEmail = await fetch ("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const resCheckUsername = await fetch ("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                }),
            });

            const emailCheck = await resCheckEmail.json();
            const usernameCheck = await resCheckUsername.json();

            if (usernameCheck.user) {
                setError("Username already exists!");
                return;
            }

            if (emailCheck.user) {
                setError("Email already exists!");
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            

            if(res.ok) {
                // const form = e.target;
                setError("")
                // form.reset()
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                router.push("/login")
            } else {
                console.log("User registering failed.")
            }

        } catch (error) {
            console.log("Error during registering :", error);
        }
        
        
    }

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
        setError(""); 
    };

  return (
    <div className="w-full lg:max-w-2xl">
        
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white w-full px-2 md:px-10 py-8 md:py-12 lg:py-14 gap-4 md:gap-5 lg:gap-4 shadow">

            <h1 className="text-2xl md:text-3xl font-bold text-center">Register</h1>

            <div className="w-11/12 flex flex-col justify-center gap-5">
                <div  className="flex flex-col gap-3 md:gap-4 lg:gap-3 self-center w-full" >
                    <div className="flex flex-col gap-2">
                        <label className="text-xs md:text-base lg:text-sm font-medium text-zinc-400  ">Username</label>
                        <input 
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            onChange={handleInputChange(setUsername)}

                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs md:text-base lg:text-sm font-medium text-zinc-400  ">Email</label>
                        <input 
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            onChange={handleInputChange(setEmail)}

                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs md:text-base lg:text-sm  font-medium text-zinc-400  ">Password</label>
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            onChange={handleInputChange(setPassword)}

                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs md:text-base lg:text-sm  font-medium text-zinc-400  ">Password Repeat</label>
                        <input 
                            type="password"
                            placeholder="Password Repeat"
                            name="passwordRepeat"
                            className="text-sm md:text-lg lg:text-base px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            onChange={handleInputChange(setConfirmPassword)}

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
                    className="bg-zinc-950 text-white text-sm md:text-lg lg:text-base font-medium py-2 w-full border flex justify-center items-center self-center my-1 hover:shadow hover:bg-zinc-800">REGISTER
                </button>
            </div>
                
            <div>
                <p className="text-xs sm:text-sm md:text-base font-normal">Already have an account?  
                    <Link href="/login" className="font-semibold ml-1 hover:underline hover:text-green-500">Login</Link> 
                </p>
                
            </div>
        </form>
    </div>
  )
}

export default RegisterForm;
