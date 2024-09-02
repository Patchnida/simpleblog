'use client'
import { useRouter } from 'next/navigation';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from "@/app/firebaseConfig";

const PopupBox = ({ onClose, id, data }) => {
    const router = useRouter();
    const prevImgUrl = data?.img || ""; // Ensure that the image URL is available

    const handleCancel = () => {
        console.log("Cancel clicked");
        onClose();
    };

    const handleDelete = async () => {
        try {
            if (prevImgUrl) {
                const prevImgRef = ref(storage, prevImgUrl);
                await deleteObject(prevImgRef);
            }

            const res = await fetch(`http://localhost:3000/api/blogs?id=${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete the blog');
            }

            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-white w-10/12 max-w-96 md:max-w-xl">
            <div className="w-full max-w-xs md:max-w-lg h-full z-10 py-8 md:py-16">
                <h1 className="text-lg md:text-3xl text-center font-semibold mb-1 md:mb-2">Are you sure you want</h1>
                <h1 className="text-lg md:text-3xl text-center font-semibold">to delete this blog?</h1>
                <div className="flex flex-row gap-5 px-10 mt-5">
                    <button
                        onClick={handleCancel}
                        className="bg-white text-zinc-950 text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-zinc-950 text-white text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupBox;
