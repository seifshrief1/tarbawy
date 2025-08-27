import React from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { useAuth } from "../../contexts/AuthContext";
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
            src="https://sdmntpreastus.oaiusercontent.com/files/00000000-8c34-61f9-93b5-ff91f032c878/raw?se=2025-08-27T20%3A53%3A10Z&sp=r&sv=2024-08-04&sr=b&scid=b638acd8-c36e-5768-8247-65e8ceb4f1ed&skoid=f05d6a75-3c59-41ae-be2c-51a75f29841e&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-27T16%3A09%3A33Z&ske=2025-08-28T16%3A09%3A33Z&sks=b&skv=2024-08-04&sig=TLM2jmMNgsJlDDblREhmBWsXwl%2BTXNygPqyuk6SAw6A%3D"
            alt="teacher avatar"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {currentUser.userName}
          </h2>
          <p className="text-blue-600 font-medium mt-1">
            {currentUser.teacherSubject}
          </p>
        </div>

        {/* بيانات أساسية */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaEnvelope className="text-blue-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">البريد الإلكتروني: </span>
              {currentUser.email}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaPhone className="text-green-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">رقم الهاتف: </span>
              {currentUser.phone}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaUserGraduate className="text-purple-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">سنوات الخبرة: </span>
              {currentUser.teacherExperience} سنوات
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <FaChalkboardTeacher className="text-orange-500 text-xl" />
            <p className="text-gray-700">
              <span className="font-semibold">تدريس مادة: </span>
              {currentUser.teacherSubject}
            </p>
          </div>
        </div>

        {/* نبذة */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">نبذة عني</h3>
          <p className="text-gray-700 leading-relaxed">
            {currentUser.teacherBio}
          </p>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;
