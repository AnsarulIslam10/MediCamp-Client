import React from "react";
import error from "../../../assets/error.svg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <img className="w-[400px]" src={error} alt="" />
      <Link
        to={"/"}
        className="btn bg-primary hover:bg-primary-hover text-white text-lg"
      >
        <FaArrowLeft /> Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
