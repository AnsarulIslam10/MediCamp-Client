import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/available-camps"}>Available Camps</NavLink>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="text-4xl font-bold">
            <span className="text-primary">M</span>edi
            <span className="text-primary">C</span>amp
          </a>
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
                className="menu menu-sm dropdown-content rounded-box bg-white mt-3 w-32 p-2 shadow z-50"
              >
                <button disabled>
                  <a>{user?.displayName}</a>
                </button>
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <button onClick={signOutUser}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/signUp"} className="btn bg-primary font-bold">
              Join Us
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
