import { FaBars } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/MediCamp.svg";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import {
  FaCreditCard,
  FaList,
  FaListCheck,
  FaPlus,
  FaUser,
} from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { signOutUser, user } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
    document.body.className = updatedTheme;
  };
  const navLinkStyles = ({ isActive }) =>
    `flex justify-start pl-2 btn btn-ghost mb-3 font-bold uppercase ${
      isActive ? "text-primary" : "text-white"
    }`;

  const handleLogOut = () => {
    signOutUser();
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content (main area) */}
      <div className="drawer-content flex flex-col lg:px-10 dark:bg-[#121212] dark:text-white">
        {/* Top Navbar */}
        <div className="navbar top-0 left-0 right-0 fixed bg-white dark:bg-[#1a1a1a] shadow px-6">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden btn btn-ghost btn-circle mr-2"
            >
              <FaBars className="text-xl" />
            </label>
            <h1 className="text-lg font-bold lg:ml-72">Dashboard</h1>
          </div>
          <div className="flex-none">
            <div className="mr-4 mt-2">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-7 w-7 fill-current text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-7 w-7 fill-current text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
            <div className="dropdown dropdown-end">
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="user avatar" />
                    ) : (
                      <FaUser className="text-2xl m-auto" />
                    )}
                  </div>
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-white dark:bg-[#1a1a1a] rounded-box w-52"
              >
                <li>
                  <NavLink
                    to={
                      isAdmin
                        ? "/dashboard/organizer-profile"
                        : "/dashboard/participant-profile"
                    }
                  >
                    <FaUser className="mr-2" /> Profile
                  </NavLink>
                </li>
                <li onClick={handleLogOut}>
                  <a>
                    <MdExitToApp className="mr-2" /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-slate-800 min-h-screen w-72 p-4 text-white">
          <Link to={"/"}>
            <img className="mt-4 w-56 drop-shadow-xl" src={logo} alt="" />
          </Link>
          <div className="divider divider-info mb-10"></div>

          {/* Sidebar content */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/organizer-overview"}
                  className={navLinkStyles}
                >
                  <ImStatsBars className="text-2xl" /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/organizer-profile"}
                  className={navLinkStyles}
                >
                  <FaUser className="text-2xl" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/add-camp"} className={navLinkStyles}>
                  <FaPlus className="text-2xl" /> Add A Camp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/manage-camps"}
                  className={navLinkStyles}
                >
                  <FaList className="text-2xl" />
                  Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/manage-registered-camps"}
                  className={navLinkStyles}
                >
                  <FaListCheck className="text-2xl" />
                  Manage Registered Camps
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={"/dashboard/participant-overview"}
                  className={navLinkStyles}
                >
                  <ImStatsBars className="text-2xl" /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/participant-profile"}
                  className={navLinkStyles}
                >
                  <FaUser className="text-2xl" /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/registered-camps"}
                  className={navLinkStyles}
                >
                  <FaListCheck className="text-2xl" /> Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/payment-history"}
                  className={navLinkStyles}
                >
                  <FaCreditCard className="text-2xl" /> Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
