import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/Logo/MediCamp.svg";
import useAdmin from "../../../hooks/useAdmin";
import { MdExitToApp } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isAdmin] = useAdmin();
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
          Available Camps
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="max-w-[1400px] mx-auto bg-white navbar sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow gap-3 items-center"
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
              className="menu menu-sm font-semibold dropdown-content rounded-box bg-white mt-3 space-y-2 w-40 p-2 text-xl shadow z-50"
            >
              <button disabled className="text-start ml-3">
                <a>{user?.displayName}</a>
              </button>
              {user && isAdmin && (
                <li>
                  <Link className="text-xl" to={"/dashboard/organizer-profile"}>
                    Dashboard
                  </Link>
                </li>
              )}
              {user && !isAdmin && (
                <li>
                  <Link
                    className="text-xl"
                    to={"/dashboard/participant-profile"}
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
