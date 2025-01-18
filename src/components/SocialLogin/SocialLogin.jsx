import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

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
    <div className="text-5xl text-[#444444] justify-center flex gap-10 items-center">
      <FaGoogle
        onClick={handleGoogleSignIn}
        className="rounded-full cursor-pointer hover:scale-110 transition-all duration-300 p-2 border border-black"
      />
    </div>
  );
};

export default SocialLogin;