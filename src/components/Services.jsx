import React from "react";
import { Clock, Users, BookOpen, Headphones, Smartphone } from "lucide-react";
const Services = () => {
  const services = [
    {
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: "توفير الوقت",
      description: "التعلم من أي مكان وفي أي وقت يناسبك بدون قيود.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-indigo-600" />,
      title: "سهلة الاستخدام",
      description: "منصة بسيطة وسهلة الاستخدام لجميع الأعمار.",
    },
    {
      icon: <Users className="w-10 h-10 text-indigo-600" />,
      title: "مدرسين متخصصين",
      description: "أفضل المدرسين المتخصصين في مجالات متنوعة.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-indigo-600" />,
      title: "مرونة في التعلم",
      description: "دورات متنوعة تناسب جميع المستويات والاحتياجات.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-indigo-600" />,
      title: "دعم متواصل",
      description: "فريق دعم متاح للإجابة عن استفساراتك في أي وقت.",
    },
  ];

  return (
    <div className="w-full py-12 px-6 bg-gray-50">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
        <span className="border-b-4 border-blue-500 pb-2 inline-block">
          خدماتنا
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-2xl shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
