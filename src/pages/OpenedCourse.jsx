import React, { useState } from "react";

const OpenedCourse = () => {
  // بيانات تجريبية للدروس في الكورس
  const lessons = [
    {
      id: 1,
      title: "مقدمة الدورة والأساسيات",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?", // Placeholder video
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
    {
      id: 2,
      title: "الوحدة الأولى: الجبر",
      videoUrl: "https://www.youtube.com/embed/A-s_86J0q9M?", // Placeholder video
      thumbnail: "https://img.youtube.com/vi/A-s_86J0q9M/hqdefault.jpg",
    },
    {
      id: 3,
      title: "الوحدة الثانية: الهندسة",
      videoUrl: "https://www.youtube.com/embed/P-8L2x492tA?", // Placeholder video
      thumbnail: "https://img.youtube.com/vi/P-8L2x492tA/hqdefault.jpg",
    },
    {
      id: 4,
      title: "الوحدة الثالثة: التفاضل",
      videoUrl: "https://www.youtube.com/embed/E-1D-b7QJ8Y?", // Placeholder video
      thumbnail: "https://img.youtube.com/vi/E-1D-b7QJ8Y/hqdefault.jpg",
    },
    {
      id: 5,
      title: "الدرس الأخير: مراجعة",
      videoUrl: "https://www.youtube.com/embed/K8_Y4x56T2U?", // Placeholder video
      thumbnail: "https://img.youtube.com/vi/K8_Y4x56T2U/hqdefault.jpg",
    },
  ];

  // بيانات تجريبية تفصيلية للكورس
  const courseDetails = {
    title: "دورة الرياضيات المتقدمة",
    description:
      "تعلّم أساسيات الرياضيات مع مدرسين متخصصين. هذه الدورة ستساعدك على بناء أساس قوي في الرياضيات وتطبيقاتها العملية. ستغطي الدورة مواضيع مثل الجبر، الهندسة، التفاضل والتكامل بأسلوب سهل ومبسط.",
    teacher: "أ. محمد علي",
    duration: "10 ساعات",
    lessonsCount: 20,
    price: "250 ج.م",
    learnings: [
      "فهم وحل المعادلات الجبرية المعقدة.",
      "إتقان مبادئ الهندسة الأساسية وتطبيقاتها.",
      "التعرف على أساسيات التفاضل والتكامل.",
      "تطبيق المفاهيم الرياضية لحل المشكلات الواقعية.",
    ],
  };

  // حالة لتحديد الفيديو الحالي الذي يتم عرضه
  const [currentVideo, setCurrentVideo] = useState(lessons[0]);

  // دالة لتغيير الفيديو المعروض
  const handleLessonClick = (lesson) => {
    setCurrentVideo(lesson);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Course Title and Breadcrumbs */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            {courseDetails.title}
          </h1>
          <p className="mt-2 text-gray-600">
            الصفحة الرئيسية دوراتي {courseDetails.title}
          </p>
        </div>

        {/* Main Content: Video Player and Lessons Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              {currentVideo.title}
            </h2>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              {/* Using an iframe for a responsive video player */}
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Course Details Section (New) */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                تفاصيل الدورة
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>الوصف:</strong> {courseDetails.description}
                </p>
                <p>
                  <strong>المدرس:</strong> {courseDetails.teacher}
                </p>
                <p>
                  <strong>المدة:</strong> {courseDetails.duration}
                </p>
                <p>
                  <strong>عدد الدروس:</strong> {courseDetails.lessonsCount}
                </p>
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    ماذا ستتعلم
                  </h4>
                  <ul className="space-y-1 list-disc list-inside">
                    {courseDetails.learnings.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Playlist */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              محتوى الدورة
            </h3>
            <ul className="space-y-4">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson)}
                  className={`flex items-center space-x-4 cursor-pointer p-3 rounded-xl transition-all duration-200 ${
                    currentVideo.id === lesson.id
                      ? "bg-blue-100 ring-2 ring-blue-500 transform scale-[1.02]"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={lesson.thumbnail}
                    alt={`thumbnail for ${lesson.title}`}
                    className="w-20 h-14 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p
                      className={`font-semibold text-gray-800 ${
                        currentVideo.id === lesson.id ? "text-blue-600" : ""
                      }`}
                    >
                      {lesson.title}
                    </p>
                  </div>
                  {currentVideo.id === lesson.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedCourse;
