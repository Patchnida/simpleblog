import { useRouter } from "next/navigation";

const PopupBox = ({ onClose }) => {

    const router = useRouter();

    const handleCancle = () => {
        console.log("test cancle");
        onClose()
    }

    const handleSubmit = () => {
        console.log("test cancle");
        router.push("/")
    }

  return (
    <div className="flex justify-center items-center bg-white w-10/12 max-w-96 md:max-w-xl">
        <div className="w-full max-w-xs md:max-w-lg h-full z-10 py-8 md:py-16">
            <h1 className="text-lg md:text-3xl text-center font-semibold mb-1 md:mb-2">Are you sure you want</h1>
            <h1 className="text-lg md:text-3xl text-center font-semibold">to delete this blog ?</h1>
            <div className="flex flex-row gap-5 px-10 mt-5">
                <button
                    onClick={handleCancle}
                    className="bg-white text-zinc-950 text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-100"
                >Cancle</button>
                <button
                    onClick={handleSubmit}
                    className="bg-zinc-950 text-white text-sm md:text-xl lg:text-xl font-medium py-2 w-full lg:w-52 md:py-3 border flex justify-center items-center self-center hover:shadow hover:bg-zinc-800"
                >Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default PopupBox;