import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase";

const OpenedCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from("Courses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          const playlistsWithUrls = data.playlists.map((playlist) => ({
            ...playlist,
            videos: playlist.videos.map((video) => ({
              ...video,
              videoUrl: video.path, // نستخدم الرابط المخزن في الـ DB
            })),
          }));

          const normalizedCourse = {
            ...data,
            playlists: playlistsWithUrls,
          };

          setCourse(normalizedCourse);
          setCurrentVideo(playlistsWithUrls[0]?.videos[0] || null);
        }
      } catch (err) {
        console.error("Error fetching course:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course)
    return <p className="text-center font-bold text-4xl">Course not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Course Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            {course.name}
          </h1>
          <p className="mt-2 text-gray-600">
            الصفحة الرئيسية دوراتي {course.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 md:p-6">
            {currentVideo ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  {currentVideo.title}
                </h2>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                  <video
                    className="absolute top-0 left-0 w-full h-full"
                    src={currentVideo.videoUrl}
                    controls
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-600">اختر فيديو من القائمة</p>
            )}
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              محتوى الدورة
            </h3>
            {course.playlists.map((playlist, pIdx) => (
              <div key={pIdx} className="mb-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                  {playlist.name}
                </h4>
                <ul className="space-y-4">
                  {playlist.videos.map((lesson, idx) => (
                    <li
                      key={idx}
                      onClick={() => setCurrentVideo(lesson)}
                      className={`flex items-center space-x-4 cursor-pointer p-3 rounded-xl transition-all duration-200 ${
                        currentVideo?.videoUrl === lesson.videoUrl
                          ? "bg-blue-100 ring-2 ring-blue-500 transform scale-[1.02]"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex-grow">
                        <p
                          className={`font-semibold text-gray-800 ${
                            currentVideo?.videoUrl === lesson.videoUrl
                              ? "text-blue-600"
                              : ""
                          }`}
                        >
                          {lesson.title}
                        </p>
                      </div>
                      {currentVideo?.videoUrl === lesson.videoUrl && (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedCourse;
