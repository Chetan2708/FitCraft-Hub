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
    <form onSubmit={handleSubmit(RegisterData)} >
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
      <div className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })} // Add validation rules
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500">Email is required</span>
        )}{" "}
        {/* Display error message if email is not provided */}
        {errors.email?.type === "pattern" && (
          <span className="text-red-500">Invalid email format</span>
        )}{" "}
        {/* Display error message if email format is invalid */}
      </div>
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 8 })} // Add validation rules
        />
        {errors.password?.type === "required" && (
          <span className="text-red-500">Password is required</span>
        )}{" "}
        {/* Display error message if password is not provided */}
        {errors.password?.type === "minLength" && (
          <span className="text-red-500">
            Password must be at least 8 characters long
          </span>
        )}{" "}
        {/* Display error message if password is too short */}
      </div>
      <div className="w-full flex justify-center items-center mt-20">
        <Button
          type="submit"
          className="text-lg lg:text-3xl w-1/2 bg-green-600 py-6 lg:py-10 rounded-2xl text-white"
        >
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Signup;
