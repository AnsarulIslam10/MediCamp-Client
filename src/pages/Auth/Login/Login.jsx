import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import signin from "../../../assets/animation/signin.gif"
const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    signInUser(data.email, data.password)
      .then((result) => {
        setLoading(false);
        toast.success("Login Successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        if (err && err.code) {
          toast.error(err.code);
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-secondary px-2">
      <Helmet>
        <title>MediCamp | Sign In</title>
      </Helmet>
      <div className="hero-content flex-col shadow-custom-dark md:flex-row shadow-card-shadow">
        <div className="text-center hidden md:block lg:text-left">
          <img src={signin} alt="" />
        </div>
        <div className="card w-full max-w-md shrink-0 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-[40px] font-bold mb-5 text-secondary">
              Sign In
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500">Email is required*</span>
              )}
            </div>
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
                name="password"
                className="input input-bordered"
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
                    ? "password must have uppercase, one lowercase, one number and one speacial charecter"
                    : ""}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn rounded-lg font-bold bg-primary hover:bg-primary-hover">
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <p className="text-center text-lg">
              Don't have an account?{" "}
              <Link to={"/signUp"} className="font-semibold underline">
                Sign Up
              </Link>
            </p>
            <p className="px-6 divider text-center text-xl font-medium text-[#444444]">
              Or Sign In with
            </p>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
