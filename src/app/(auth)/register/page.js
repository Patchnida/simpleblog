import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full h-fit xl:max-w-6xl flex justify-center items-center px-2 sm:px-5 md:px-10 lg:px-24">
      <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage;