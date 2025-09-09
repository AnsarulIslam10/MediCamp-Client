import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/Logo/MediCamp.svg";
import useAdmin from "../../../hooks/useAdmin";
import { MdExitToApp } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover mr-2 ${
              isActive ? "bg-primary" : ""
            }`
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
              isActive ? "bg-primary" : ""
            }`
          }
          to={"/available-camps"}
        >
          All Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
              isActive ? "bg-primary" : ""
            }`
          }
          to={"/about"}
        >
          About
        </NavLink>
      </li>
      {user ? (
        isAdmin ? (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
                    isActive ? "bg-primary" : ""
                  }`
                }
                to={"/dashboard/organizer-profile"}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
                    isActive ? "bg-primary" : ""
                  }`
                }
                to={"/dashboard/organizer-overview"}
              >
                Overview
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
                    isActive ? "bg-primary" : ""
                  }`
                }
                to={"/dashboard/participant-profile"}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover ${
                    isActive ? "bg-primary" : ""
                  }`
                }
                to={"/dashboard/participant-overview"}
              >
                Overview
              </NavLink>
            </li>
          </>
        )
      ) : (
        ""
      )}
      <li className="dropdown dropdown-hover hidden lg:block relative">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-ghost text-xl rounded-none hover:bg-primary-hover"
        >
          Sections <IoMdArrowDropdown />
        </div>

        {/* Mega Menu */}
        <div
          tabIndex={0}
          className="dropdown-content bg-white dark:bg-slate-900 rounded-box w-[600px] shadow absolute left-1/2 top-5 -translate-x-1/2 mt-2 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("banner")}
            >
              Banner
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("popular-camps")}
            >
              Popular Camps
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("services")}
            >
              Services
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("doctors")}
            >
              Doctors
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("health")}
            >
              Health Tips
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("feedback")}
            >
              Feedback
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("Blog")}
            >
              Blogs
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("memories")}
            >
              Memories
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("member")}
            >
              Member
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("contact")}
            >
              Contact
            </button>
            <button
              className="btn btn-sm btn-ghost text-xl justify-start hover:bg-primary-hover"
              onClick={() => handleScroll("faq")}
            >
              FAQs
            </button>
          </div>
        </div>
      </li>
    </>
  );
  return (
    <nav className="max-w-[1400px] bg-white dark:bg-[#121212] mx-auto navbar sticky top-0 z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="lg:hidden mr-2 cursor-pointer"
          >
            <FaBars />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-[#121212] rounded-box z-50 mt-3 w-52 p-2 shadow gap-3 items-center"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <img className="drop-shadow-2xl w-60" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
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
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img referrerPolicy="no-referrer" alt="" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm font-semibold dropdown-content rounded-box bg-white dark:bg-slate-900 mt-3 space-y-2 w-40 p-2 text-xl shadow z-50"
            >
              <button disabled className="text-start ml-3">
                <a>{user?.displayName}</a>
              </button>
              {user && isAdmin && (
                <li>
                  <Link
                    className="text-xl"
                    to={"/dashboard/organizer-overview"}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {user && !isAdmin && (
                <li>
                  <Link
                    className="text-xl"
                    to={"/dashboard/participant-overview"}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button className="text-xl uppercase" onClick={signOutUser}>
                  <MdExitToApp /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/logIn"} className="btn bg-primary font-bold">
            Join Us
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
