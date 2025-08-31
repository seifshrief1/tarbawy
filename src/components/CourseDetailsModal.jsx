import React from "react";

const CourseDetailsModal = ({
  selectedCourse,
  showModalContent,
  closeModal,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black/80 bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ opacity: showModalContent ? 1 : 0 }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative transform transition-transform duration-300"
        style={{ transform: showModalContent ? "scale(1)" : "scale(0.95)" }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {/* Modal Content */}
        <div className="flex-grow overflow-y-auto">
          {/* Image Section */}
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-end p-8 text-white">
              <h2 className="text-3xl font-extrabold">
                {selectedCourse.title}
              </h2>
            </div>
          </div>

          <div className="p-8">
            {/* Tabs Section */}
            <div className="flex space-x-4 border-b-2 border-gray-200 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("الوصف")}
                className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                  activeTab === "الوصف"
                    ? "text-blue-600 border-b-4 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                الوصف
              </button>
              <button
                onClick={() => setActiveTab("محتوى الدورة")}
                className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                  activeTab === "محتوى الدورة"
                    ? "text-blue-600 border-b-4 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                محتوى الدورة
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "الوصف" && (
                <div className="animate-fade-in">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedCourse.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-100 rounded-xl">
                      <span className="font-semibold text-gray-700">
                        المدة:
                      </span>{" "}
                      {selectedCourse.duration}
                    </div>
                    <div className="p-4 bg-gray-100 rounded-xl">
                      <span className="font-semibold text-gray-700">
                        عدد الدروس:
                      </span>{" "}
                      {selectedCourse.lessons_count}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                    ماذا ستتعلم
                  </h3>
                  <p className="space-y-4 whitespace-pre-line">
                    {selectedCourse.what_will_learn}
                  </p>
                </div>
              )}

              {activeTab === "محتوى الدورة" && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    محتوى الدورة التدريبية
                  </h3>
                  <div className="space-y-4 whitespace-pre-line">
                    {selectedCourse.course_content}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
