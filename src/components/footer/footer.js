import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-white w-full h-16 shadow-t-md sticky bottom-0">
        <div className="flex gap-4 justify-end mx-5 items-center  my-0 py-2 w-auto h-full">
            <Link href="mailto:patchnida2547@gmail.com">
                <Image src="/email.svg" alt="" width={30} height={30}/>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100012580239691" passHref>
                <Image src="/facebook.svg" alt="" width={30} height={30}/>
            </Link>
            <Link href="https://www.instagram.com/27mxys/" passHref>
                <Image src="/instagram.svg" alt="" width={30} height={30}/>
            </Link>
        </div>
    </div>
        

  )
}

export default Footer;