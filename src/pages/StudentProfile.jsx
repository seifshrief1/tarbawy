import React, { useState } from "react";
import { FaUserGraduate, FaBookOpen } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* صورة الطالب */}
      <div className="w-40 h-40 mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
          alt="Student"
          className="w-full h-full object-cover rounded-full shadow-lg"
        />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 flex items-center justify-center gap-2 font-semibold ${
              activeTab === "info"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            <FaUserGraduate /> بيانات الطالب
          </button>
          <button
            className={`flex-1 py-3 flex items-center justify-center gap-2 font-semibold ${
              activeTab === "courses"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            <FaBookOpen /> الكورسات المشترك بها
          </button>
        </div>

        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                👤 معلومات الطالب
              </h2>
              <p>
                <span className="font-semibold">الاسم:</span>{" "}
                {currentUser?.userName}
              </p>
              <p>
                <span className="font-semibold">الهاتف:</span>{" "}
                {currentUser?.phone}
              </p>
              <p>
                <span className="font-semibold">المرحلة:</span>{" "}
                {currentUser?.studentGrade == "first"
                  ? "الصف الأول الاعدادي"
                  : currentUser?.studentGrade == "second"
                  ? "الصف الثاني الاعدادي"
                  : "الصف الثالث الاعدادي"}
              </p>
              <p>
                <span className="font-semibold">البريد الإلكتروني:</span>{" "}
                {currentUser?.email}
              </p>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                📚 الكورسات المشترك بها
              </h2>
              <ul className="space-y-3">
                <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">
                    دورة الرياضيات – المستوى 2
                  </h3>
                  <p className="text-sm text-gray-500">
                    مدرس: أ. محمود – المدة: 3 شهور
                  </p>
                </li>
                <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">
                    دورة اللغة الإنجليزية – المستوى 1
                  </h3>
                  <p className="text-sm text-gray-500">
                    مدرس: أ. سارة – المدة: 2 شهر
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
