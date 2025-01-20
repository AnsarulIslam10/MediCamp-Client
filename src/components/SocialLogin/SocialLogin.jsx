import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

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
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="text-xl btn btn-outline border-primary hover:bg-transparent hover:border-primary-hover hover:text-black border-2 justify-center flex items-center">
      <FcGoogle className="text-3xl" onClick={handleGoogleSignIn} /> Google
    </div>
  );
};

export default SocialLogin;
