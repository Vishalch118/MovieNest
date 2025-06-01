import React from "react";
import logo from "../video-editing-app.png";
import dayNight from "../day-and-night.png";
import { Link } from "react-router-dom";

const Navbar = ({ isNightMode, handleToggleNightMode }) => {
  return (
    <div
      className={`flex items-center pl-3 py-4 ${
        isNightMode ? "border-gray-600" : "border-gray-200"
      }`}
    >
      <div className="flex space-x-8 items-center">
        <img className="w-[40px]" src={logo} alt="Logo" />
        <Link to="/" className="text-blue-500 text-xl font-bold">
          Movies
        </Link>
        <Link to="/watchList" className="text-blue-500 text-xl font-bold">
          Watch List
        </Link>
      </div>
      <div className="flex items-center ml-auto space-x-4 pr-4">
        <button
          onClick={handleToggleNightMode} // Trigger the toggle function
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
        >
          <img src={dayNight} alt="Day/Night Mode Toggle" className="w-6 h-6" />
        </button>

        <Link to="/signin" className="text-blue-500 text-xl font-bold">
          Sign In
        </Link>
        <Link to="/signup" className="text-blue-500 text-xl font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
