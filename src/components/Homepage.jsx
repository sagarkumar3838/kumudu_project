import React from "react";
import FrameSection from "./FrameSection";
import MainContent from "./MainContent";
import { Link } from "react-router-dom"; // ✅ Corrected import
import FrameCustomizer from "./FrameCustomizer";

const Homepage = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow hover:text-blue-500"
            >
              <li><a href="/">Home</a></li> {/* ✅ Ensure it's a valid link */}
              <li><Link to="/">Create Frame</Link></li> {/* ✅ Move <Link> inside <li> */}
              <li><a href="#">Order History</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MagicFrames</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/">Home</a></li> {/* ✅ Ensure it's a valid link */}
            <li><Link to="/">Create Frame</Link></li> {/* ✅ Move <Link> inside <li> */}
            <li><a href="#">Order History</a></li>
          </ul>
        </div>
        <div className="dropdown dropdown-end navbar-end mr-10">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mt-4">
            <div className="w-10 rounded-full">
              <img
                alt="User Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={10}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-[5rem] w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between" href="/">
                Home <span className="badge">New</span>
              </a>
            </li>
            <li><Link to="/">Create Frame</Link></li> {/* ✅ Move <Link> inside <li> */}
            <li><a href="#">Order History</a></li>
          </ul>
        </div>
      </div>

      {/* Grid layout for FrameSection and MainContent */}
      <div>
       
        <FrameCustomizer/>
      </div>
    </>
  );
};

export default Homepage;
