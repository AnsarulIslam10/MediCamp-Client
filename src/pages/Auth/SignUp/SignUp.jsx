import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthProvider";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import sideImg from "../../../assets/Login-rafiki.png";
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({
          displayName: data.name,
          photoURL: data.photoURL,
        });
        const userInfo = {
          name: data.name,
          email: data.email,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();

            toast.success("Sign Up successful");
            navigate(location?.state ? location.state : "/");
          }
        });
      })
      .catch((err) => {
        if (err && err.code) {
          toast.error(err.code);
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-[#444444] px-2">
      <div className="hero-content flex-col shadow-custom-dark md:flex-row shadow-card-shadow">
        <div className="text-center hidden md:block lg:text-left">
          <img src={sideImg} alt="" />
        </div>
        <div className="card w-full max-w-md shrink-0 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-[40px] font-bold mb-5 text-[#151515]">
              Sign Up
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("name", { required: true })}
                name="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required*</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("photoURL", { required: true })}
                name="photoURL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-500">Photo URL is required*</span>
              )}
            </div>
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
                Sign Up
              </button>
            </div>

            <p className="text-center text-lg">
              Already have an account?{" "}
              <Link to={"/logIn"} className="font-semibold underline">
                Sign In
              </Link>
            </p>
            <p className="divider px-6 text-center text-xl font-medium text-[#444444]">
              Or Sign Up With
            </p>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
