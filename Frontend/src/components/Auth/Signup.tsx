import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../utils/components/ui/input";
import { SignUpType } from "../../definitions";
import { Button } from "../../utils/components/ui/button";

interface SignupProps {
  onSignup: (data: SignUpType) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>();

  const RegisterData = (data: SignUpType) => {
    onSignup(data);
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-7xl w-full">
          <form className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto md:max-w-md w-full" onSubmit={handleSubmit(RegisterData)}>
            <h3 className="text-2xl font-extrabold mb-10">Registration</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <Input
               
                    type="text"
                    placeholder="Enter name"
                    {...register("name", { required: true })}
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  />
                  {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <Input
                  
                    type="text"
                    placeholder="Enter email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-red-500">Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-red-500">Invalid email format</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <Input
                 
                    type="password"
                    placeholder="Enter password"
                    {...register("password", { required: true, minLength: 8 })}
                    className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-500">Password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be at least 8 characters long
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  I accept the <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                </label>
              </div>
            </div>
            <div className="mt-10">
              <Button
                type="submit"
                className="py-4 px-6 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Create an account
              </Button>
            </div>
            <p className="text-sm mt-6">Already have an account? <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Login here</a></p>
          </form>
          <div className="h-full max-md:mt-10">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
