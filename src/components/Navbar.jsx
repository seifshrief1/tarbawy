import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, handleSignOut } = useAuth();
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Nav Links (Right for desktop) */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-semibold">
        {currentUser && (
          <Link
            to={"/profile"}
            className="hover:text-blue-600 transition duration-300"
          >
            الملف الشخصي
          </Link>
        )}
        <Link
          to={"/about"}
          className="hover:text-blue-600 transition duration-300"
        >
          معلومات عنا
        </Link>
        <Link
          to={"/courses"}
          className="hover:text-blue-600 transition duration-300"
        >
          الكورسات
        </Link>
        <Link to={"/"} className="hover:text-blue-600 transition duration-300">
          الرئيسية
        </Link>
      </div>

      <Link to="/" className="text-center flex justify-center">
        <h2 className="text-blue-600 font-bold text-4xl">Tarbawy</h2>
      </Link>

      {/* Icons (Left) */}
      <div className="flex space-x-4 text-gray-700 text-2xl items-center">
        <Link to={"/courses"} className="hover:text-blue-600">
          <CiSearch />
        </Link>
        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm rounded-md cursor-pointer transition duration-300"
          >
            تسجيل خروج
          </button>
        ) : (
          <Link to={"/signin"} className="hover:text-blue-600">
            <CiUser />
          </Link>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 z-50 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link
            to={"/"}
            className="hover:text-blue-600 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            to={"/courses"}
            className="hover:text-blue-600 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            الكورسات
          </Link>
          <Link
            to={"/about"}
            className="hover:text-blue-600 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            معلومات عنا
          </Link>
          {currentUser && (
            <Link
              to={"/profile"}
              className="hover:text-blue-600 transition duration-300"
            >
              الملف الشخصي
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
