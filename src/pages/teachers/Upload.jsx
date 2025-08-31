import React, { useState } from "react";
import TeacherLayout from "../../layouts/TeacherLayout";
import { useCrud } from "../../contexts/CrudContext";
import { toast } from "react-toastify";

const Upload = () => {
  const { handleUploadCourse } = useCrud();
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([{ name: "", videos: [] }]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [whatWillLearn, setWhatWillLearn] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [grade, setGrade] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [lessonsCount, setLessonsCount] = useState("");

  const addPlaylist = () => {
    setPlaylists([...playlists, { name: "", videos: [] }]);
  };

  const addVideoToPlaylist = (playlistIndex) => {
    const newPlaylists = [...playlists];
    newPlaylists[playlistIndex].videos.push({ title: "", file: null });
    setPlaylists(newPlaylists);
  };

  const handlePlaylistNameChange = (e, index) => {
    const newPlaylists = [...playlists];
    newPlaylists[index].name = e.target.value;
    setPlaylists(newPlaylists);
  };

  const handleVideoNameChange = (e, playlistIndex, videoIndex) => {
    const newPlaylists = [...playlists];
    newPlaylists[playlistIndex].videos[videoIndex].title = e.target.value;
    setPlaylists(newPlaylists);
  };

  const handleVideoFileChange = (e, playlistIndex, videoIndex) => {
    const newPlaylists = [...playlists];
    newPlaylists[playlistIndex].videos[videoIndex].file = e.target.files[0];
    setPlaylists(newPlaylists);
  };

  // دالة للتعامل مع اختيار ملف الصورة المصغرة
  const handleThumbnailChange = (e) => {
    setCourseThumbnail(e.target.files[0]);
  };

  // دالة الرفع الرئيسية
  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !courseThumbnail ||
      !courseTitle ||
      !courseDescription ||
      !grade ||
      !courseContent ||
      !lessonsCount ||
      !whatWillLearn ||
      !courseDuration ||
      playlists.length === 0
    ) {
      toast.error("جميع الحقول مطلوبة!");
      setLoading(false);
      return;
    }

    if (!grade) {
      toast.error("يجب اختيار الصف الدراسي");
      setLoading(false);
      return;
    }

    const courseInfo = {
      courseTitle,
      courseDescription,
      whatWillLearn,
      courseDuration,
      courseThumbnail,
      playlists,
      grade,
      courseContent,
      lessonsCount,
    };

    const result = await handleUploadCourse(courseInfo);

    setLoading(false);

    if (result.success) {
      toast.success("تم رفع الدورة بنجاح!");
    } else {
      toast.error("فشل في رفع الدورة: " + result.error);
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 mb-8">
          رفع دورة جديدة
        </h2>

        {/* Course Main Info Section */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            معلومات الدورة الأساسية
          </h3>
          <div className="space-y-4">
            {/* Course Title */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                اسم الدورة
              </label>
              <input
                type="text"
                placeholder="مثال: شرح منهج اللغة العربية للصف الأول الإعدادي"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  وصف الدورة
                </label>
                <textarea
                  placeholder="اكتب وصفًا قصيرًا وواضحًا يوضح محتوى الدورة."
                  className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                ></textarea>
              </div>

              {/* What will learn */}
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  ماذا سيتعلم الطالب؟
                </label>
                <textarea
                  placeholder="اكتب النقاط الرئيسية في شكل نقاط (مثال: تذكر اهم نقاط المنهج)."
                  className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={whatWillLearn}
                  onChange={(e) => setWhatWillLearn(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  مدة الدورة
                </label>
                <input
                  type="text"
                  placeholder="مثال: 10 ساعات أو 4 أسابيع"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                />
              </div>
              {/* Grade (الصف الدراسي) */}
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  الصف الدراسي
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">اختر الصف</option>
                  <option value="الأول الإعدادي">الأول الإعدادي</option>
                  <option value="الثاني الإعدادي">الثاني الإعدادي</option>
                  <option value="الثالث الإعدادي">الثالث الإعدادي</option>
                </select>
              </div>
            </div>

            {/* Course Content */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                محتوى الدورة
              </label>
              <textarea
                placeholder={`الوحدة الأولى\n- الدرس الأول\n- الدرس الثاني\n\nالوحدة الثانية\n- الدرس الأول\n- الدرس الثاني`}
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={courseContent}
                onChange={(e) => setCourseContent(e.target.value)}
              ></textarea>
            </div>

            {/* Lessons Count */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                عدد الدروس
              </label>
              <input
                type="number"
                placeholder="مثال: 12"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={lessonsCount}
                onChange={(e) => setLessonsCount(e.target.value)}
              />
            </div>

            {/* Thumbnail Image */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                الصورة المصغرة (صورة الغلاف)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleThumbnailChange}
              />
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
            <h3 className="text-xl font-bold text-gray-800">محتوى الدورة</h3>
            <button
              type="button"
              onClick={addPlaylist}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>إضافة قائمة تشغيل</span>
            </button>
          </div>

          {playlists.map((playlist, playlistIndex) => (
            <div
              key={playlistIndex}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="اسم قائمة التشغيل"
                  value={playlist.name}
                  onChange={(e) => handlePlaylistNameChange(e, playlistIndex)}
                  className="w-full text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
                />
                <button
                  type="button"
                  onClick={() => addVideoToPlaylist(playlistIndex)}
                  className="flex-shrink-0 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  + فيديو
                </button>
              </div>

              <div className="space-y-3">
                {playlist.videos.map((video, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="p-3 bg-gray-100 rounded-md flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4"
                  >
                    <span className="text-gray-500 font-bold">
                      {videoIndex + 1}.
                    </span>
                    <input
                      type="text"
                      placeholder="اسم الفيديو"
                      className="w-full md:w-1/2 border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoNameChange(e, playlistIndex, videoIndex)
                      }
                    />
                    <input
                      type="file"
                      accept="video/*"
                      className="w-full md:w-1/2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
                      onChange={(e) =>
                        handleVideoFileChange(e, playlistIndex, videoIndex)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePublish}
          disabled={loading}
          className={`w-full text-white font-semibold px-8 py-3 rounded-lg shadow-md transition transform ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {loading ? "جاري الرفع..." : "نشر الدورة"}
        </button>
      </div>
    </TeacherLayout>
  );
};

export default Upload;
