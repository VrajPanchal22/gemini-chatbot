"use client";

import { useRouter } from "next/navigation";
import { LogInDto } from "@/api-interface/logInRequestDto";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {
  const router = useRouter();

  const { mutate, isLoading } = useMutation<any, any, LogInDto>({
    mutationFn: async (logInDto: LogInDto) => {
      return await axios.post("api/auth/log-in", logInDto);
    },
    onSuccess: ({ data }) => {
      router.push("/chat");
    },
    onError: ({ data }) => {},
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data: LogInDto) => {
    const logInDto: LogInDto = {
      email: data.email,
      password: data.password,
    };
    mutate(logInDto);
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 mt-2">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 mt-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <p className="text-center">
            Don&apos;t have an account?
            <span
              className="text-blue-500 cursor-pointer pl-1"
              onClick={handleSignup}
            >
              Sign up
            </span>
          </p>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
