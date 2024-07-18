import Image from "next/image";

const Footer = () => {
  return (
    <div className=" bg-white w-full h-16 shadow-t-md fixed bottom-0">
        <div className="flex gap-4 justify-end mx-5 items-center  my-0 py-2 w-auto h-full">
            <div>
                <Image src="/email.png" alt="" width={30} height={30}/>
            </div>
            <div>
                <Image src="/facebook.svg" alt="" width={30} height={30}/>
            </div>
            <div>
                <Image src="/instagram.svg" alt="" width={30} height={30}/>
            </div>
        </div>
    </div>
        

  )
}

export default Footer;