import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import sideImg from "../../../assets/Login-rafiki.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
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
    <div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-[#444444] px-2">
      <div className="hero-content flex-col shadow-custom-dark lg:flex-row shadow-card-shadow">
        <div className="text-center lg:text-left">
          <img src={sideImg} alt="" />
        </div>
        <div className="card w-full max-w-md shrink-0 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-center text-[40px] font-bold mb-5 text-[#151515]">
              Log In
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
              <button className="btn rounded-lg font-bold bg-primary mb-2">
                Sign In
              </button>
            </div>

            <p className="text-center text-lg">
              Don't have an account?{" "}
              <Link to={"/signUp"} className="font-semibold underline">
                Sign Up
              </Link>
            </p>
            <p className="text-center my-4 text-xl font-medium text-[#444444]">
              Or Login with
            </p>
            <SocialLogin></SocialLogin>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
