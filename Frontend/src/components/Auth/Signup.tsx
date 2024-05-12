import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../../utils/components/ui/input"
import { SignUpType } from '../../definitions';



interface SignupProps {
  onSignup: (data: SignUpType) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const { register, handleSubmit } = useForm<SignUpType>();

  const RegisterData = (data: SignUpType) => {  // data from react useFrom hook
    onSignup(data);
  };

  return (
    <form onSubmit={handleSubmit(RegisterData)} >
      <div className='mb-4'> 
        <Input 
        type="text"
        placeholder='Name'
        {...register('name')}
        />
      </div>
      <div className='mb-4'>
      <Input 
        type="email"
        placeholder='Email'
        {...register('email')}
        />
      </div>
      <div className='mb-4'> 
        <Input 
        type="password"
         placeholder='Password'
          {...register('password')}
        />

      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
