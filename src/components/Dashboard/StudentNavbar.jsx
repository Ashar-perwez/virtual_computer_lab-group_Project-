import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentNavbar = ({ studentName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        // Clear user session data
        // localStorage.removeItem("userType");
        // localStorage.removeItem("userData");
        navigate("/");
      }
    }

    return (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Student Name */}
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="text-lg font-semibold hover:text-blue-200 transition"
              >
                {studentName}
              </Link>
            </div>

            {/* Right Section: Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/coding-interface"
                className="hover:text-blue-200 transition text-sm font-medium"
              >
                Practice
              </Link>
              <Link
                to="/progress"
                className="hover:text-blue-200 transition text-sm font-medium"
              >
                Progress
              </Link>
              <Link
                to="/account"
                className="hover:text-blue-200 transition text-sm font-medium"
              >
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-700 transition duration-300 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default StudentNavbar;