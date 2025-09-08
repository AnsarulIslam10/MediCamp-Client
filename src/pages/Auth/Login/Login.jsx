import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import signin from "../../../assets/animation/signin.gif";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        setLoading(false);
        toast.success("Login Successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.code) {
          toast.error(err.code);
        }
      });
  };

  // Demo credentials
  const fillDemoCredentials = (role) => {
    if (role === "user") {
      setValue("email", "user@gmail.com");
      setValue("password", "123456Aa@");
    } else if (role === "admin") {
      setValue("email", "admin@gmail.com");
      setValue("password", "123456Aa@");
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen px-2 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>MediCamp | Sign In</title>
      </Helmet>
      <div className="hero-content flex-col md:flex-row shadow-custom-dark shadow-card-shadow rounded-xl bg-white dark:bg-gray-800">
        <div className="text-center hidden md:block lg:text-left">
          <img src={signin} alt="Sign In Illustration" />
        </div>
        <div className="card w-full max-w-md shrink-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-[40px] font-bold mb-5">
              Sign In
            </h2>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              {errors.email && (
                <span className="text-red-500">Email is required*</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="input input-bordered bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors.password.type === "required"
                    ? "Password is required*"
                    : errors.password.type === "minLength"
                    ? "Password must be at least 6 characters"
                    : errors.password.type === "maxLength"
                    ? "Password must not be more than 20 characters"
                    : errors.password.type === "pattern"
                    ? "Password must have uppercase, one lowercase, one number and one special character"
                    : ""}
                </span>
              )}
            </div>

            {/* Sign In Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn rounded-lg font-bold bg-primary hover:bg-primary-hover text-white"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Demo Credential Buttons */}
            <p className="px-6 divider text-center">Demo Credentials</p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials("user")}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold"
              >
                Demo User
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold"
              >
                Demo Admin
              </button>
            </div>

            {/* Links */}
            <p className="text-center text-lg mt-4">
              Don't have an account?{" "}
              <Link
                to={"/signUp"}
                className="font-semibold underline text-primary dark:text-primary-hover"
              >
                Sign Up
              </Link>
            </p>
            <p className="px-6 divider text-center text-xl font-medium">
              Or Sign In with
            </p>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
