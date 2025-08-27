import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import TeacherCourses from "./pages/teachers/teacherCourses";
import Upload from "./pages/teachers/upload";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OpenedCourse from "./pages/OpenedCourse";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import TeacherProfile from "./pages/teachers/TeacherProfile";
import StudentProfile from "./pages/StudentProfile";

function App() {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <>
      {location.pathname === "/teacher/teacherCourses" ||
      location.pathname === "/teacher/upload" ||
      location.pathname === "/teacher/profile" ||
      location.pathname === "/signin" ||
      location.pathname === "/signup" ? null : (
        <Navbar />
      )}

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute currentUser={currentUser}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute currentUser={currentUser}>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute currentUser={currentUser}>
              <Courses />
            </PrivateRoute>
          }
        />
        <Route
          path="/openedCourse/:name"
          element={
            <PrivateRoute currentUser={currentUser}>
              <OpenedCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/teacher/teacherCourses"
          element={
            <PrivateRoute currentUser={currentUser}>
              <TeacherCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/upload"
          element={
            <PrivateRoute currentUser={currentUser}>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/profile"
          element={
            <PrivateRoute currentUser={currentUser}>
              <TeacherProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute currentUser={currentUser}>
              <StudentProfile />
            </PrivateRoute>
          }
        />
      </Routes>

      {location.pathname === "/teacher/teacherCourses" ||
      location.pathname === "/teacher/upload" ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
