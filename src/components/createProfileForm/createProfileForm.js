"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

const CreateProfileForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const getUser = async () => {
        if (!session) return;

        try {
            const res = await fetch("/api/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`, // Adjust if your session token is different
                },
                cache: "no-store",
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

    useEffect(() => {
        if (img) {
            const imgUrl = URL.createObjectURL(img);
            setImgPreview(imgUrl);

            return () => URL.revokeObjectURL(imgUrl);
        }
    }, [img]);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (uploading) {
            setError('Image is still uploading. Please wait.');
            return;
        }

        try {
            let imgUrl = '';
            if (img) {
                setUploading(true);
                try {
                    const imgRef = ref(storage, `profiles/${img.name}`);
                    await uploadBytes(imgRef, img);
                    imgUrl = await getDownloadURL(imgRef);
                } catch (error) {
                    setError('Failed to upload image');
                    return;
                } finally {
                    setUploading(false);
                }
            }

            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify({
                    name,
                    surname,
                    phone,
                    img: imgUrl,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create profile");
            }

            router.push("/profile");
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div className="w-full min-w-80 flex justify-center items-center bg-white shadow p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-6 py-4 md:gap-10 lg:gap-10 md:py-10"
            >
                <h1 className="text-2xl md:text-5xl font-bold text-center">
                    Create Profile
                </h1>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-10">
                    <div className="relative flex justify-center items-center border rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 lg:w-64 lg:h-64">
                        <Image
                            src={imgPreview || "/noavatar.png"}
                            fill
                            style={{ objectFit: "cover" }}
                            alt="Profile picture"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                            <label className="text-white text-sm bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition duration-300">
                                Upload image
                                <input
                                    type="file"
                                    name="image"
                                    className="hidden"
                                    onChange={handleImgChange}
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start self-center w-full lg:w-7/12 gap-2 md:gap-4">
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                                value={user.username || ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                                Surname
                            </label>
                            <input
                                type="text"
                                placeholder="Surname"
                                name="surname"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                                value={user.email || ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center w-full">
                            <label className="text-sm md:text-xl lg:text-base font-medium w-20 md:w-28 text-zinc-400 mr-4 md:mr-24 lg:mr-16">
                                Phone
                            </label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                className="text-sm md:text-xl lg:text-base p-1 md:p-2 border w-48 md:w-72 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm md:text-xl text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-zinc-950 text-white text-sm md:text-xl lg:text-base font-medium py-2 w-full max-w-72 lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800"
                >
                    CREATE PROFILE
                </button>
            </form>
        </div>
    );
};

export default CreateProfileForm;
