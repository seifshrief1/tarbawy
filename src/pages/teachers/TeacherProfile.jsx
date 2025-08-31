import React from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { useAuth } from "../../contexts/AuthContext";
import teacherAvatar from "../../assets/681d37ce-ef63-40cb-a9a6-ca552aaa91a1.png";
import {
  FaEnvelope,
  FaPhone,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

const TeacherProfile = () => {
  const { currentUser } = useAuth();

  return (
    <TeacherLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
        {/* صورة شخصية */}
        <div className="flex flex-col items-center text-center">
          <img
            src={teacherAvatar}
            alt="teacher avatar"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {currentUser?.userName}
          </h2>
          <p className="text-blue-600 font-medium mt-1">
            {currentUser?.teacherSubject}
          </p>
        </div>

        {/* بيانات أساسية */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaEnvelope className="text-blue-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">البريد الإلكتروني: </span>
              {currentUser?.email}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaPhone className="text-green-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">رقم الهاتف: </span>
              {currentUser?.phone}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaUserGraduate className="text-purple-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">سنوات الخبرة: </span>
              {currentUser?.teacherExperience} سنوات
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaChalkboardTeacher className="text-orange-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">تدريس مادة: </span>
              {currentUser?.teacherSubject}
            </p>
          </div>
        </div>

        {/* نبذة */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">نبذة عني</h3>
          <p className="text-gray-700 leading-relaxed">
            {currentUser?.teacherBio}
          </p>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;
