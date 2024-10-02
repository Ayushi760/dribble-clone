import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";
import dribbbleIcon from "../assets/dribbble.svg";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { state, dispatch } = useContext(GlobalStateContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div
      style={{ fontFamily: "Mona Sans" }}
      className="grid grid-cols-[1fr_96px_1fr] gap-[24px] px-10 h-[100px] justify-center items-center bg-[#f8f7f4]"
    >
      <div>
        <ul className="flex flex-row text-[14px] gap-[32px] font-bold">
          <li className="flex gap-1 items-center">
            Find Designers <FaAngleDown />
          </li>
          <li>Inspiration</li>
          <li>Jobs</li>
          <li>Go Pro</li>
        </ul>
      </div>
      <a href="/">
        <img src={dribbbleIcon} alt="Logo" className="h-24" />
      </a>
      <div className="flex flex-row items-center justify-end gap-6 w-full">
        <div className="relative flex items-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="absolute left-4 w-4 h-4 fill-gray-500"
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            className="h-12 pl-10 pr-4 border-2 border-transparent rounded-full outline-none bg-white text-gray-900 transition duration-300 ease-in-out placeholder-gray-400 focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)]"
            type="text"
            placeholder="Search"
          />
        </div>

        {state.isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-black font-semibold text-[14px]">
              {state.currentUser?.fullname || state.currentUser?.username}
            </span>
            <button
              onClick={handleLogout}
              className="h-12 px-4 text-black font-semibold text-[14px]"
            >
              Log out
            </button>
          </div>
        ) : (
          <>
          <Link to="/login">
            <button className="h-12 px-4 text-black font-semibold text-[14px]">
              Log in
            </button>
          </Link>
            <button className="text-white bg-black h-12 rounded-full p-6 flex items-center">
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;