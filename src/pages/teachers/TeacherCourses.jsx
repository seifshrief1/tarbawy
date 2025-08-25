import React from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "كورس اللغة الإنجليزية",
    description: "مستوي المبتدئين لتعلم أساسيات اللغة الإنجليزية.",
    students: 25,
  },
  {
    id: 2,
    title: "كورس اللغة العربية",
    description: "كورس شامل لتعلم القواعد والنحو.",
    students: 18,
  },
];

const TeacherCourses = () => {
  return (
    <TeacherLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">كورساتي</h1>
          <Link
            to={"/upload"}
            className="px-4 py-2 bg-blue-600 text-center text-white rounded-lg hover:bg-blue-700 transition"
          >
            + اضافة كورس جديد
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>👥 {course.students} طالب</span>
                <button className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherCourses;
