import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8">
        <h1 className="text-2xl md:text-5xl font-extrabold leading-snug mb-6">
          ابدأ <span className="text-blue-300">رحلتك التعليمية</span> من بيتك،
          <br />و<span className="text-blue-300">طور مهاراتك</span> مع أفضل
          الكورسات والدروس التفاعلية
        </h1>
        <p className="text-md md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          مع منصتنا هتتعلم من مدرسين خبرة في مجالات متنوعة، وهتلاقي محتوى مناسب
          لمستواك وأهدافك التعليمية. التعليم عندنا أسهل، أسرع، وأمتع.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={"/about"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition hover:scale-105 duration-300"
          >
            اعرف اكتر
          </Link>
          <Link
            to={"/courses"}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition hover:scale-105 duration-300"
          >
            استعراض الكورسات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
