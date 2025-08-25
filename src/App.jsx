import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import TeacherCourses from "./pages/teachers/teacherCourses";
import Upload from "./pages/teachers/upload";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OpenedCourse from "./pages/OpenedCourse";

function App() {
  return (
    <>
      {window.location.pathname == "/teacherCourses" ||
      window.location.pathname == "/upload" ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teacherCourses" element={<TeacherCourses />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/openedCourse/:name" element={<OpenedCourse />} />
      </Routes>
      {window.location.pathname == "/teacherCourses" ||
      window.location.pathname == "/upload" ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
