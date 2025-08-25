import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
        {/* عن المنصة */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">عن المنصة</h2>
          <p className="text-sm leading-6">
            منصتنا التعليمية للمرحلة الإعدادية تساعد الطلاب على التعلم بسهولة مع
            مدرسين متخصصين، وتوفر الوقت بطريقة سلسة وسهلة الاستخدام.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">روابط سريعة</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-500 cursor-pointer">الرئيسية</li>
            <li className="hover:text-blue-500 cursor-pointer">أحدث الدورات</li>
            <li className="hover:text-blue-500 cursor-pointer">الخدمات</li>
            <li className="hover:text-blue-500 cursor-pointer">تواصل معنا</li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3">تواصل معنا</h2>
          <div className="flex justify-center md:justify-end gap-4 text-lg">
            <a href="#" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* الحقوق */}
      <div className="bg-gray-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} جميع الحقوق محفوظة - منصتنا التعليمية
      </div>
    </footer>
  );
};

export default Footer;
