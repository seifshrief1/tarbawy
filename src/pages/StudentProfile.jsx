import React from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const StudentProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen">
      {/* صورة الطالب */}
      <div className="w-32 h-32 mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
          alt="Student"
          className="w-full h-full object-cover rounded-full shadow-lg border-4 border-blue-100"
        />
      </div>

      {/* كارت بيانات الطالب */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <FaUserGraduate /> بيانات الطالب
        </h2>

        <div className="space-y-4 text-gray-700">
          <p className="flex items-center gap-2">
            <FaUserGraduate className="text-blue-500" />
            <span className="font-semibold">الاسم:</span>{" "}
            {currentUser?.userName}
          </p>

          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500" />
            <span className="font-semibold">الهاتف:</span> {currentUser?.phone}
          </p>

          <p className="flex items-center gap-2">
            <FaBookOpen className="text-purple-500" />
            <span className="font-semibold">المرحلة:</span>{" "}
            {currentUser?.studentGrade === "first"
              ? "الصف الأول الاعدادي"
              : currentUser?.studentGrade === "second"
              ? "الصف الثاني الاعدادي"
              : "الصف الثالث الاعدادي"}
          </p>

          <p className="flex items-center gap-2">
            <FaEnvelope className="text-red-500" />
            <span className="font-semibold">البريد الإلكتروني:</span>{" "}
            {currentUser?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
