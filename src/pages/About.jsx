import React from "react";
import { FaChalkboardTeacher, FaClock, FaLaptopCode } from "react-icons/fa";

const About = () => {
  return (
    <div className="py-12 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
        من نحن
      </h2>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        نحن منصة تعليمية تهدف إلى توفير أفضل الدورات التعليمية أونلاين مع مدرسين
        متخصصين، حيث نهتم بتوفير تجربة تعلم سهلة الاستخدام وتوفير وقتك وجهدك.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <FaChalkboardTeacher className="text-5xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">مدرسين متخصصين</h3>
          <p className="text-gray-600 text-sm">
            جميع الدورات يقدمها مدرسين خبراء في مجالاتهم لضمان جودة التعليم.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <FaClock className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">توفير الوقت</h3>
          <p className="text-gray-600 text-sm">
            تعلم أينما كنت وفي أي وقت يناسبك مع إمكانية مشاهدة الدروس المسجلة.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <FaLaptopCode className="text-5xl text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">سهولة الاستخدام</h3>
          <p className="text-gray-600 text-sm">
            منصة سهلة الاستخدام تساعدك على الوصول إلى الدورات والتعلم بسهولة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
