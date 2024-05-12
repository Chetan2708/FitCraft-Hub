import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../../utils/components/ui/input"
import { LoginType } from '../../definitions';



interface Loginprops {
  onLogin : (data:LoginType)=>void //defining onLogin function types 
  
}
const Login:React.FC<Loginprops> = ({onLogin}) => {

  const { register, handleSubmit } = useForm<LoginType>();

  const LoginData = (data: LoginType) => {  // data from react useFrom hook
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(LoginData)} >
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
      <button type="submit">Login</button>
    </form>
  )
}

export default Login