import React from "react";
import { FaBars, FaHome, FaListAlt, FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { MdExitToApp } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/Logo/MediCamp.svg";
import {
  FaChartBar,
  FaCreditCard,
  FaList,
  FaListCheck,
  FaPlus,
  FaUser,
} from "react-icons/fa6";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
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
      <div className="drawer-content flex flex-col lg:px-10">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="lg:hidden">
          <FaBars className="absolute text-3xl top-1 left-1" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-slate-800 min-h-screen w-70 p-4">
          <Link to={"/"}>
            <img className="mt-4 w-56 drop-shadow-xl" src={logo} alt="" />
          </Link>
          <div className="divider divider-info mb-10"></div>
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/organizer-profile"}
                  className={navLinkStyles}
                >
                  <FaUser className="text-3xl" /> Organizer Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/add-camp"} className={navLinkStyles}>
                  <FaPlus className="text-3xl" /> Add A Camp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/manage-camps"}
                  className={navLinkStyles}
                >
                  <FaList className="text-3xl" />
                  Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/manage-registered-camps"}
                  className={navLinkStyles}
                >
                  <FaListCheck className="text-3xl" />
                  Manage Registered Camps
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/dashboard/analytics"} className={navLinkStyles}>
                  <FaChartBar className="text-3xl" /> Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/participant-profile"}
                  className={navLinkStyles}
                >
                  <FaUser className="text-3xl" /> Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/registered-camps"}
                  className={navLinkStyles}
                >
                  <FaListCheck className="text-3xl" />
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/payment-history"}
                  className={navLinkStyles}
                >
                  <FaCreditCard className="text-3xl" /> Payment History
                </NavLink>
              </li>
            </>
          )}
          <>
            <li className="absolute bottom-20">
              <NavLink to={'/'} className="btn btn-outline hover:border-primary-hover hover:text-primary-hover text-primary text-2xl uppercase font-bold">
                <FaHome className="text-3xl" /> Home
              </NavLink>
            </li>
            <li className="absolute bottom-6" onClick={handleLogOut}>
              <NavLink className="btn btn-outline hover:border-primary-hover hover:text-primary-hover text-primary text-2xl uppercase font-bold">
                <MdExitToApp className="text-3xl" /> Logout
              </NavLink>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
