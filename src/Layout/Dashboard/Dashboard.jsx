import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navLinkStyles = ({ isActive }) =>
    `flex items-center font-bold uppercase ${
      isActive ? "text-primary" : "text-white"
    }`;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="lg:hidden"
        >
          <FaBars className="absolute text-3xl top-1 left-1"/>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-slate-800 min-h-screen w-70 p-4">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to={"/dashboard/organizer-profile"}
              className={navLinkStyles}
            >
              Organizer Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/add-camp"} className={navLinkStyles}>
              Add A Camp
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manage-camps"} className={navLinkStyles}>
              Manage Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-registered-camps"}
              className={navLinkStyles}
            >
              Manage Registered Camps
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"} className={navLinkStyles}>
              Home
            </NavLink>
          </li>
          {/* participant */}
          <div className="divider divider-info">Participant</div>
          <li>
            <NavLink to={"/dashboard/analytics"} className={navLinkStyles}>
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/participant-profile"}
              className={navLinkStyles}
            >
              Participant Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/registered-camps"}
              className={navLinkStyles}
            >
              Registered Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/payment-history"}
              className={navLinkStyles}
            >
              Payment History
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
