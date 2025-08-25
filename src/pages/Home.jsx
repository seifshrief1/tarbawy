import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import RecentCourses from "../components/RecentCourses";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <hr className="border-gray-300" />
      <RecentCourses />
    </div>
  );
};

export default Home;
