import { NavLink } from "react-router-dom";
import Container from "../Container";

const Navbar = () => {
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
          {/* Profile picture */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-32 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Name
                </a>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          {/* Join Us Button */}
          <a className="btn bg-primary font-bold">Join Us</a>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
