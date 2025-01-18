import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/Logo/MediCamp.svg";
import useAdmin from "../../../hooks/useAdmin";
import { MdExitToApp } from "react-icons/md";
const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `btn btn-sm btn-ghost text-xl hover:bg-primary-hover mr-2 ${
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
            `btn btn-sm btn-ghost text-xl hover:bg-primary-hover ${
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
    <Container>
      <nav className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <img className="drop-shadow-2xl w-60" src={logo} alt="" />
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
                  <img
                    referrerPolicy="no-referrer"
                    alt=""
                    src={user?.photoURL}
                  />
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
                    <Link className="text-xl" to={"/dashboard/organizer-profile"}>Dashboard</Link>
                  </li>
                )}
                {user && !isAdmin && (
                  <li>
                    <Link className="text-xl" to={"/dashboard/participant-profile"}>Dashboard</Link>
                  </li>
                )}
                <li>
                  <button className="text-xl uppercase" onClick={signOutUser}><MdExitToApp/> Logout</button>
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
    </Container>
  );
};

export default Navbar;
