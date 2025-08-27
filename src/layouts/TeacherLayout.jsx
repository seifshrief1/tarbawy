import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBookOpen,
  FaPlusCircle,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const TeacherLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, handleSignOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-screen bg-blue-200 shadow-lg border-l border-gray-200 flex flex-col z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700 text-center">
            لوحة المدرس
          </h1>
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-2 text-gray-700 font-medium">
          <NavLink
            to="/teacher/teacherCourses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-gray-600/60 text-white"
                  : "hover:bg-gray-200 hover:text-blue-600"
              }`
            }
          >
            <FaBookOpen className="text-lg" />
            كورساتي
          </NavLink>

          <NavLink
            to="/teacher/upload"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-gray-600/60 text-white"
                  : "hover:bg-gray-200 hover:text-blue-600"
              }`
            }
          >
            <FaPlusCircle className="text-lg" />
            إنشاء كورس
          </NavLink>

          <NavLink
            to="/teacher/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-gray-600/60 text-white"
                  : "hover:bg-gray-200 hover:text-blue-600"
              }`
            }
          >
            <FaUser className="text-lg" />
            الملف الشخصي
          </NavLink>

          {currentUser && (
            <button
              onClick={handleSignOut}
              className="mt-4 bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm rounded-md"
            >
              تسجيل خروج
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-blue-500 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default TeacherLayout;
