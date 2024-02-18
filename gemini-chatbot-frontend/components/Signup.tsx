"use client";

import { useMutation } from "react-query";
import axios from "axios";
import { SignUpDto } from "@/api-interface/signUpRequestDto";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .max(50, "First name must be less than 50 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .max(50, "Last name must be less than 50 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation<any, unknown, SignUpDto>({
    mutationFn: async (signUpDto: SignUpDto) => {
      return await axios.post("api/auth/sign-up", signUpDto);
    },
    onSuccess: (data) => {
      router.push("/login");
    },
  });

  const handleSignup = (data: SignUpDto) => {
    const signUpDto: SignUpDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    mutate(signUpDto);
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <input
              {...register("firstName")}
              type="text"
              id="firstName"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="text-red-500 mt-2">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...register("lastName")}
              type="text"
              id="lastName"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="text-red-500 mt-2">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("email")}
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 mt-2">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-900" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 mt-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
