import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Mobile Menu Button (Right on small screens) */}
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

      {/* Logo (Center) */}
      <Link to="/" className="flex-1 text-center">
        <img
          src="https://lmsolutionsllc.com/wp-content/uploads/2022/10/LMS-Updated-Logo.png"
          className="w-32 mx-auto"
          alt="Logo"
        />
      </Link>

      {/* Icons (Left) */}
      <div className="flex space-x-4 text-gray-700 text-2xl">
        <Link to={"/courses"} className="hover:text-blue-600">
          <CiSearch />
        </Link>
        <button className="hover:text-blue-600">
          <CiUser />
        </button>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
