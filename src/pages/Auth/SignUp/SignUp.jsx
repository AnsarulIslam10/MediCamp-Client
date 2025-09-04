import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthProvider";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import signup from "../../../assets/animation/signup.gif";
import { Helmet } from "react-helmet-async";
import { TbFidgetSpinner } from "react-icons/tb";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({
          displayName: data.name,
          photoURL: res.data.data.display_url,
        });
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: res.data.data.display_url,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            setLoading(false);
            toast.success("Sign Up successful");
            navigate(location?.state ? location.state : "/");
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.code) {
          toast.error(err.code);
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-secondary my-6 px-2">
      <Helmet>
        <title>MediCamp | Sign Up</title>
      </Helmet>
      <div className="hero-content flex-col shadow-custom-dark md:flex-row shadow-card-shadow bg-white dark:bg-gray-800 rounded-xl">
        <div className="text-center hidden md:block lg:text-left">
          <img src={signup} alt="" />
        </div>
        <div className="card w-full max-w-md shrink-0  text-gray-900 dark:text-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-[40px] font-bold mb-5 text-secondary dark:text-gray-100">
              Sign Up
            </h2>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold dark:text-gray-200">
                  Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("name", { required: true })}
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
              {errors.name && (
                <span className="text-red-500">Name is required*</span>
              )}
            </div>

            {/* Profile Picture */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold dark:text-gray-200">
                  Profile Picture
                </span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input p-1 w-full max-w-xs dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
              {errors.photoURL && (
                <span className="text-red-500">
                  Profile picture is required*
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold dark:text-gray-200">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
              {errors.email && (
                <span className="text-red-500">Email is required*</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold dark:text-gray-200">
                  Password
                </span>
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
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
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

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn rounded-lg font-bold bg-primary hover:bg-primary-hover text-white">
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Redirect */}
            <p className="text-center text-lg dark:text-gray-300">
              Already have an account?{" "}
              <Link to={"/logIn"} className="font-semibold underline">
                Sign In
              </Link>
            </p>

            {/* Divider */}
            <p className="divider px-6 text-center text-xl font-medium text-[#444444] dark:text-gray-300">
              Or Sign Up With
            </p>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
