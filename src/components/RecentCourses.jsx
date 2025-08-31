import React, { useState } from "react";
import { useCrud } from "../contexts/CrudContext";
import CourseCard from "./CourseCard";
import CourseDetailsModal from "./CourseDetailsModal";

const RecentCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("الوصف");

  const { courses } = useCrud();

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
    <div className="w-full py-12 px-6">
      {/* العنوان */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
        <span className="border-b-4 border-blue-500 pb-2 inline-block">
          أحدث الكورسات
        </span>
      </h2>

      {/* الكورسات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.length === 0 ? (
          <h3 className="text-center text-3xl font-bold">
            لا يوجد كورسات حتي الان
          </h3>
        ) : (
          courses
            .slice(0, 4)
            .map((course) => (
              <CourseCard
                course={course}
                openModal={openModal}
                key={course.id}
              />
            ))
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

export default RecentCourses;
