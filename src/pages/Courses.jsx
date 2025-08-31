import React, { useState } from "react";
import { useCrud } from "../contexts/CrudContext";
import CourseCard from "../components/CourseCard";
import CourseDetailsModal from "../components/CourseDetailsModal";

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("الوصف");
  const { courses } = useCrud();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const coursesPerPage = 10;

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setActiveTab("الوصف");
    setTimeout(() => {
      setShowModalContent(true);
    }, 10);
  };

  const closeModal = () => {
    setShowModalContent(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedCourse(null);
    }, 300);
  };

  return (
    <div className="min-h-screen antialiased">
      <div className="px-6 py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
          <span className="border-b-4 border-blue-500 pb-3 inline-block">
            جميع الكورسات
          </span>
        </h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="ابحث عن الكورسات...."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded w-full p-2"
        />

        <hr className="border-gray-300 my-10" />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.length === 0 ? (
            <h3 className="text-center text-3xl font-bold col-span-full">
              لا يوجد كورسات مطابقة لبحثك
            </h3>
          ) : (
            currentCourses.map((course) => (
              <CourseCard
                course={course}
                openModal={openModal}
                key={course.id}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {filteredCourses.length > coursesPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              السابق
            </button>
            <span className="font-semibold">
              صفحة {currentPage} من {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              التالي
            </button>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {isModalOpen && selectedCourse && (
        <CourseDetailsModal
          selectedCourse={selectedCourse}
          showModalContent={showModalContent}
          closeModal={closeModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Courses;
