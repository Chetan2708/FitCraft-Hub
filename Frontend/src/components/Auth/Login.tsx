import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../../utils/components/ui/input";
import { LoginType } from '../../definitions';
import { Button } from '../../utils/components/ui/button';

interface LoginProps {
  onLogin: (data: LoginType) => void;
  changeTab: (data:string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin , changeTab  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();

  const loginData = (data: LoginType) => {
    onLogin(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
        <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit(loginData)}>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign in</h3>
              <p className="text-sm mt-4">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
            </div>
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <div className="relative flex flex-col items-center">
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...register('email', { required: true })}
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex  flex-col items-center">
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...register('password', { required: true })}
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                />
                {errors.password && <span className="text-red-500">Password is required</span>}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              
              <div className="text-sm">
                <a href="javascript:void(0);" className="text-blue-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="!mt-10">
              <Button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-black focus:outline-none"
              >
                Log in
              </Button>
            </div>
            <p className="text-sm !mt-10 text-center">
              Don't have an account
              <a href="javascript:void(0);" className="text-blue-600 hover:underline ml-1 whitespace-nowrap"  onClick={() => changeTab('signup')}>Register here</a>
            </p>
          </form>
        </div>
        <div className="lg:h-[400px] md:h-[300px] max-md:mt-10">
          <img src="https://readymadeui.com/login-image.webp" className="w-full h-full object-cover" alt="Dining Experience" />
        </div>
      </div>
    </div>
  );
};

export default Login;
