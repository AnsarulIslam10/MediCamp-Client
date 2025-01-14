import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const navLinkStyles = ({ isActive }) => 
        `flex items-center font-bold uppercase ${isActive ? "text-primary" : "text-white"}`;
  return (
    <div className="flex absolute left-0 w-full mx-auto">
      <div className="w-72 h-screen bg-slate-800 text-white px-4 fixed">
        <ul className="space-y-4 mt-6">
          <li>
            <NavLink to={'/dashboard/organizer-profile'} className={navLinkStyles}>Organizer Profile</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/add-camp'} className={navLinkStyles}>Add A Camp</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/manage-camp'} className={navLinkStyles}>Manage Camps</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/manage-resigtered-camps'} className={navLinkStyles}>Manage Registered Camps</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex ml-72 overflow-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
