import React from "react";
import { Link } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { useAuth } from "../contexts/AuthContext";

const Signin = () => {
  const { userData, setUserData, handleSignIn } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
          Tarbawy - تربوي
        </h1>

        <form className="space-y-6">
          <div className="relative">
            <CiMail className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <CiLock className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          <button
            onClick={(e) => handleSignIn(e, userData)}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ليس لديك حساب؟{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
