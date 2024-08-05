'use client'

import CreateProfileForm from "@/components/createProfileForm/createProfileForm";
import { useSession } from "next-auth/react";

const CreateProfilePage = () => {

  const { data: session } = useSession();
  
  console.log(session);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full flex justify-center items-center px-2 sm:px-5 md:px-10 lg:px-24">
      <CreateProfileForm />
      </div>
    </div>
  )
}

export default CreateProfilePage;