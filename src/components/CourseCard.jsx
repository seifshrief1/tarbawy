import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course, openModal }) => {
  const { currentUser } = useAuth();
  return (
    <div
      key={course.id}
      className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.description}</p>

        <span className="text-gray-700 font-medium py-1">
          المدرس: {course.teacher_name}
        </span>

        {/* الأزرار */}
        <div className="flex justify-center items-center gap-2 w-full">
          <button
            onClick={() => openModal(course)}
            className="border-blue-500 border text-blue-500 font-medium py-2 px-4 w-full hover:bg-gray-200 rounded-xl transition-all duration-300"
          >
            تفاصيل الكورس
          </button>
          {currentUser && (
            <Link
              to={`/openedCourse/${course.id}`}
              className="bg-blue-600 text-center hover:bg-blue-700 text-white font-medium py-2 w-full px-4 rounded-xl transition-all duration-300"
            >
              مشاهدة الآن
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
