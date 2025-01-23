import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="shadow-md py-4 bg-white">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          width={160}
          className="cursor-pointer"
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Application Logo"
        />

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Home
          </Link>
          <Link
            to="/recruiters"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Recruiters
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/applications"
              className="hover:text-blue-600 transition duration-200 font-medium"
            >
              Applied Jobs
            </Link>
            <span className="hidden sm:block text-gray-600">
              Hi, {`${user.firstName} ${user.lastName}`}
            </span>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-200"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white shadow-sm border-t mt-2">
        <div className="flex justify-around py-3 text-gray-600 text-sm">
          <Link to="/" className="hover:text-blue-600 transition duration-200">
            Home
          </Link>
          <Link
            to="/recruiters"
            className="hover:text-blue-600 transition duration-200"
          >
            Recruiters
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
