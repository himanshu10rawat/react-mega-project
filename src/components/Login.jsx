import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwriteServices/auth-service";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          const { $id, name, email } = user;
          dispatch(authLogin({ userData: { $id, name, email } }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full py-8 md:py-12 px-3 sm:px-4">
      <div className="card-base w-full max-w-lg p-6 md:p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <span className="w-16 md:w-20 h-16 md:h-20 bg-linear-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-purple-600 hover:text-violet-600 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 text-xs md:text-sm font-medium">
              {error}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full text-sm md:text-base"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
