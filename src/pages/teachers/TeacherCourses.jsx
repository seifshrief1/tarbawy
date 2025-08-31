import React, { useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useCrud } from "../../contexts/CrudContext";

const TeacherCourses = () => {
  const { courses, handleDeleteCourse } = useCrud();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleDeleteClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedCourseId) {
      await handleDeleteCourse(selectedCourseId);
      setShowModal(false);
      setSelectedCourseId(null);
    }
  };

  return (
    <TeacherLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">كورساتي</h1>
          <Link
            to={"/teacher/upload"}
            className="px-4 py-2 bg-blue-600 text-center text-white rounded-lg hover:bg-blue-700 transition"
          >
            + اضافة كورس جديد
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.length === 0 ? (
            <p className="text-red-500 text-center text-3xl col-span-2">
              لا يوجد لديك كورسات حتي الان
            </p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border"
              >
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  onClick={() => handleDeleteClick(course.id)}
                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-red-500 cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                هل أنت متأكد من حذف هذا الكورس؟
              </h2>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  إلغاء
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default TeacherCourses;
