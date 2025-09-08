import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photoURL: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate("/");
          toast.success("Signed In Successfully");
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div onClick={handleGoogleSignIn} className="text-xl btn btn-outline border-primary hover:bg-transparent hover:border-primary-hover hover:text-black border-2 justify-center flex items-center dark:text-white">
      <FcGoogle className="text-3xl" /> Google
    </div>
  );
};

export default SocialLogin;
