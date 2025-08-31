import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [courses, setCourses] = useState([]);

  const sanitizeFileName = (name) => {
    return name.replace(/[^a-zA-Z0-9.\-_]/g, "_").replace(/_+/g, "_");
  };

  const uploadFile = async (bucketName, folderPath, file) => {
    if (!file) {
      throw new Error("لم يتم اختيار ملف");
    }

    const sanitizedFileName = sanitizeFileName(file.name);
    const fullPath = `${folderPath}/${sanitizedFileName}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, file, { upsert: true });

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fullPath);

    return publicData.publicUrl;
  };

  const addCourseToDb = async (courseData) => {
    const { data, error } = await supabase.from("Courses").insert([courseData]);

    if (error) {
      console.error("Error adding course to database:", error.message);
      throw error;
    }
    return data;
  };

  const handleUploadCourse = async (courseInfo) => {
    const {
      courseTitle,
      courseDescription,
      whatWillLearn,
      courseDuration,
      courseThumbnail,
      playlists,
      grade,
      courseContent,
      lessonsCount,
    } = courseInfo;

    try {
      const thumbnailPath = courseThumbnail
        ? await uploadFile("tarbawy-videos", "thumbnails", courseThumbnail)
        : null;

      const playlistsWithVideoPaths = await Promise.all(
        playlists.map(async (playlist) => {
          const videosWithPaths = await Promise.all(
            playlist.videos.map(async (video) => {
              if (!video.file) return null;
              const videoPath = await uploadFile(
                "tarbawy-videos",
                "videos",
                video.file
              );
              return {
                title: video.title,
                path: videoPath,
              };
            })
          );
          return {
            name: playlist.name,
            videos: videosWithPaths.filter(Boolean),
          };
        })
      );

      const newCourse = {
        title: courseTitle,
        description: courseDescription,
        what_will_learn: whatWillLearn,
        duration: courseDuration,
        thumbnail: thumbnailPath,
        playlists: playlistsWithVideoPaths,
        created_at: new Date().toISOString(),
        teacher_id: currentUser?.id || null,
        teacher_name: currentUser?.userName || "غير معروف",
        grade: grade,
        course_content: courseContent,
        lessons_count: lessonsCount,
      };

      const courseData = await addCourseToDb(newCourse);
      return { success: true, course: courseData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("Courses").select("*");
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }
    };

    if (location.pathname === "/" || location.pathname === "/courses") {
      fetchCourses();
    }

    const fetchTeacherCourses = async () => {
      const { data, error } = await supabase
        .from("Courses")
        .select("*")
        .eq("teacher_id", currentUser.id);
      if (error) {
        console.error("Error fetching teacher courses:", error);
      } else {
        setCourses(data);
      }
    };

    if (location.pathname === "/teacher/teacherCourses") {
      fetchTeacherCourses();
    }
  }, [location.pathname]);

  const handleDeleteCourse = async (courseId) => {
    try {
      const { data: courseData, error: fetchError } = await supabase
        .from("Courses")
        .select("thumbnail, playlists")
        .eq("id", courseId)
        .eq("teacher_id", currentUser.id)
        .single();

      if (fetchError) throw fetchError;

      let filesToDelete = [];

      if (courseData.thumbnail) {
        const thumbPath = courseData.thumbnail.split(
          "/storage/v1/object/public/tarbawy-videos/"
        )[1];
        if (thumbPath) filesToDelete.push(thumbPath);
      }

      if (courseData.playlists) {
        courseData.playlists.forEach((playlist) => {
          playlist.videos.forEach((video) => {
            if (video.path) {
              const videoPath = video.path.split(
                "/storage/v1/object/public/tarbawy-videos/"
              )[1];
              if (videoPath) filesToDelete.push(videoPath);
            }
          });
        });
      }

      // 3️⃣ امسح الملفات من storage
      if (filesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("tarbawy-videos")
          .remove(filesToDelete);

        if (storageError)
          console.error("Error deleting files:", storageError.message);
      }

      const { error: deleteError } = await supabase
        .from("Courses")
        .delete()
        .eq("id", courseId)
        .eq("teacher_id", currentUser.id);

      if (deleteError) throw deleteError;

      setCourses((prevCourses) => prevCourses.filter((c) => c.id !== courseId));

      return { success: true };
    } catch (error) {
      console.error("Error deleting course:", error.message);
      return { success: false, error: error.message };
    }
  };

  return (
    <CrudContext.Provider
      value={{ handleUploadCourse, courses, handleDeleteCourse }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export const useCrud = () => {
  return React.useContext(CrudContext);
};
