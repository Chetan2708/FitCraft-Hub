import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../../utils/components/ui/input";
import { LoginType } from '../../definitions';
import { Button } from '../../utils/components/ui/button';

interface LoginProps {
  onLogin: (data: LoginType) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();

  const loginData = (data: LoginType) => {
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(loginData)} >
      <div className='mb-4'>
        <Input
          type="email"
          placeholder='Email'
          {...register('email', { required: true })}
        />
        {errors.email && <span className="text-red-500">Email is required</span>}
      </div>
      <div className='mb-4'>
        <Input
          type="password"
          placeholder='Password'
          {...register('password', { required: true })}
        />
        {errors.password && <span className="text-red-500">Password is required</span>}
      </div>
      <div className='w-full flex justify-center mt-20'>
        <Button
          type="submit"
          className='text-lg lg:text-3xl w-1/2 bg-green-600 py-6 lg:py-10 rounded-2xl text-white'
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
