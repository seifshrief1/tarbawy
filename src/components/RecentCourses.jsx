import React, { useState, useEffect } from "react";

const RecentCourses = () => {
  // حالة لإظهار وإخفاء النافذة المنبثقة (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // حالة للتحكم في الأنيمايشن (animation)
  const [showModalContent, setShowModalContent] = useState(false);
  // حالة لتخزين بيانات الكورس المحدد
  const [selectedCourse, setSelectedCourse] = useState(null);
  // حالة للتحكم في التبويبات داخل المودال
  const [activeTab, setActiveTab] = useState("الوصف");

  // بيانات تجريبية للكورسات مع تفاصيل إضافية
  const courses = [
    {
      id: 1,
      title: "دورة الرياضيات",
      description:
        "تعلّم أساسيات الرياضيات مع مدرسين متخصصين. هذه الدورة ستساعدك على بناء أساس قوي في الرياضيات وتطبيقاتها العملية. ستغطي الدورة مواضيع مثل الجبر، الهندسة، التفاضل والتكامل بأسلوب سهل ومبسط.",
      teacher: "أ. محمد علي",
      instructorDetails:
        "أستاذ جامعي متخصص في الرياضيات التطبيقية، مع خبرة تزيد عن 10 سنوات في تدريس المناهج الدراسية لجميع المستويات. معروف بأسلوبه المبسط والفعال في توصيل المعلومات.",
      learnings: [
        "فهم وحل المعادلات الجبرية المعقدة.",
        "إتقان مبادئ الهندسة الأساسية وتطبيقاتها.",
        "التعرف على أساسيات التفاضل والتكامل.",
        "تطبيق المفاهيم الرياضية لحل المشكلات الواقعية.",
      ],
      courseContent: [
        {
          title: "الوحدة 1: مقدمة في الجبر",
          lessons: ["المتغيرات والثوابت", "المعادلات الخطية", "المتراجحات"],
        },
        {
          title: "الوحدة 2: أساسيات الهندسة",
          lessons: [
            "المساحات والأحجام",
            "نظريات المثلثات",
            "الدوائر والمضلعات",
          ],
        },
        {
          title: "الوحدة 3: مقدمة في التفاضل",
          lessons: ["مفهوم المشتقة", "قواعد الاشتقاق", "تطبيقات على التفاضل"],
        },
      ],
      price: "250 ج.م",
      duration: "10 ساعات",
      lessons: 20,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.nezpasqNXoETz8PghMoB3AHaEK?pid=Api&P=0&h=220",
    },
    {
      id: 2,
      title: "دورة اللغة العربية",
      description:
        "قواعد ونصوص وبلاغة بأسلوب سهل ومبسط. ستتقن فنون اللغة وتعبيراتها المختلفة، وتصبح قادراً على الكتابة والتحدث بفصاحة وثقة. الدورة تركز على التطبيق العملي للنصوص الأدبية.",
      teacher: "أ. أحمد محمود",
      instructorDetails:
        "خبير في اللغة العربية وآدابها، حاصل على درجة الماجستير في النقد الأدبي. لديه شغف كبير بتعليم اللغة العربية بطريقة مبتكرة وتفاعلية.",
      learnings: [
        "فهم القواعد النحوية والصرفية بشكل عميق.",
        "تحليل النصوص الأدبية والشعرية.",
        "إتقان فنون البلاغة والبيان.",
        "تطوير مهارات الكتابة الإبداعية والوظيفية.",
      ],
      courseContent: [
        {
          title: "الوحدة 1: النحو والصرف",
          lessons: ["أنواع الكلمة", "المبتدأ والخبر", "الأفعال الخمسة"],
        },
        {
          title: "الوحدة 2: البلاغة العربية",
          lessons: [
            "التشبيه والاستعارة",
            "الكناية والمجاز",
            "الطباق والمقابلة",
          ],
        },
        {
          title: "الوحدة 3: النصوص والأدب",
          lessons: [
            "تحليل نصوص جاهلية",
            "فهم الأدب الحديث",
            "كتابة المقال الأدبي",
          ],
        },
      ],
      price: "200 ج.م",
      duration: "15 ساعة",
      lessons: 30,
      image:
        "https://tse4.mm.bing.net/th/id/OIP.hRDLhfDaZ1nGJHsLhPahvAHaEK?pid=Api&P=0&h=220",
    },
    {
      id: 3,
      title: "دورة اللغة الإنجليزية",
      description:
        "تعلم المحادثة والقواعد بطريقة عملية. ستحصل على الثقة للتحدث والكتابة بالإنجليزية بطلاقة. هذه الدورة مناسبة للمبتدئين والمتوسطين الذين يرغبون في تحسين مهاراتهم اللغوية بشكل سريع.",
      teacher: "أ. سارة حسن",
      instructorDetails:
        "مدرسة لغة إنجليزية معتمدة من جامعة كامبريدج، مع خبرة واسعة في تدريس اللغة الإنجليزية كلغة ثانية. تتميز بأسلوبها الحماسي واستخدام الأنشطة التفاعلية في الدروس.",
      learnings: [
        "بناء المفردات والجمل الأساسية.",
        "تحسين مهارات الاستماع والمحادثة.",
        "فهم واستخدام القواعد النحوية بشكل صحيح.",
        "التدرب على سيناريوهات حياتية يومية.",
      ],
      courseContent: [
        {
          title: "Module 1: Basic Grammar",
          lessons: ["Present Tense", "Past Tense", "Future Tense"],
        },
        {
          title: "Module 2: Conversation Skills",
          lessons: ["Introductions", "Daily routines", "Ordering food"],
        },
        {
          title: "Module 3: Vocabulary Building",
          lessons: ["Common verbs", "Adjectives", "Nouns for daily life"],
        },
      ],
      price: "300 ج.م",
      duration: "12 ساعة",
      lessons: 25,
      image:
        "https://schoolweb.tdsb.on.ca/portals/leasidehs/images/english-course.jpg?ver=2018-11-06-093530-200",
    },
    {
      id: 4,
      title: "دورة العلوم",
      description:
        "اكتشف العلوم بطريقة تفاعلية وممتعة. استكشف عجائب الكيمياء والفيزياء والأحياء من خلال تجارب عملية. ستتعلم كيفية التفكير العلمي وحل المشكلات المعقدة.",
      teacher: "أ. خالد يوسف",
      instructorDetails:
        "أستاذ علوم حائز على عدة جوائز، معروف بتبسيط المفاهيم العلمية المعقدة. لديه قناة يوتيوب شهيرة لتعليم العلوم بطرق مسلية ومبتكرة.",
      learnings: [
        "فهم المبادئ الأساسية للكيمياء والفيزياء.",
        "استكشاف الأنظمة الحيوية في علم الأحياء.",
        "إجراء تجارب علمية بسيطة وآمنة.",
        "تطبيق المنهج العلمي في حياتك اليومية.",
      ],
      courseContent: [
        {
          title: "الوحدة 1: أساسيات الفيزياء",
          lessons: [
            "القوى والحركة",
            "الطاقة وأنواعها",
            "الكهرباء والمغناطيسية",
          ],
        },
        {
          title: "الوحدة 2: أساسيات الكيمياء",
          lessons: [
            "الذرات والجزيئات",
            "التفاعلات الكيميائية",
            "المركبات العضوية",
          ],
        },
        {
          title: "الوحدة 3: عالم الأحياء",
          lessons: ["الخلية الحية", "النباتات والحيوانات", "الجهاز الدوري"],
        },
      ],
      price: "280 ج.م",
      duration: "20 ساعة",
      lessons: 40,
      image:
        "https://chemistrybench.com/wp-content/uploads/2024/04/LimeWire-AI-Studio-Asset-34.jpeg",
    },
  ];

  // دالة لفتح النافذة المنبثقة
  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setActiveTab("الوصف"); // إعادة التبويبات للوضع الافتراضي
    // تأخير بسيط لبدء الأنيمايشن بعد فتح المودال
    setTimeout(() => {
      setShowModalContent(true);
    }, 10);
  };

  // دالة لإغلاق النافذة المنبثقة
  const closeModal = () => {
    setShowModalContent(false);
    // تأخير لإغلاق المودال بعد انتهاء الأنيمايشن
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedCourse(null);
    }, 300); // يجب أن تتطابق هذه القيمة مع مدة الأنيمايشن
  };

  return (
    <div className="w-full py-12 px-6">
      {/* العنوان */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
        <span className="border-b-4 border-blue-500 pb-2 inline-block">
          أحدث الكورسات
        </span>
      </h2>

      {/* الكورسات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{course.description}</p>

              {/* اسم المدرس + السعر */}
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-700 font-medium">
                  المدرس: {course.teacher}
                </span>
                <span className="text-blue-600 font-bold">{course.price}</span>
              </div>

              {/* الأزرار */}
              <div className="flex justify-center items-center gap-2 w-full">
                <button
                  onClick={() => openModal(course)}
                  className="border-blue-500 border text-blue-500 font-medium py-2 px-4 w-full hover:bg-gray-200 rounded-xl transition-all duration-300"
                >
                  تفاصيل الكورس
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 w-full px-4 rounded-xl transition-all duration-300">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {isModalOpen && selectedCourse && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black/80 bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300"
          style={{ opacity: showModalContent ? 1 : 0 }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative transform transition-transform duration-300"
            style={{ transform: showModalContent ? "scale(1)" : "scale(0.95)" }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {/* Modal Content */}
            <div className="flex-grow overflow-y-auto">
              {/* Image Section */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-end p-8 text-white">
                  <h2 className="text-3xl font-extrabold">
                    {selectedCourse.title}
                  </h2>
                </div>
              </div>

              <div className="p-8">
                {/* Tabs Section */}
                <div className="flex space-x-4 border-b-2 border-gray-200 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("الوصف")}
                    className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                      activeTab === "الوصف"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    الوصف
                  </button>
                  <button
                    onClick={() => setActiveTab("محتوى الدورة")}
                    className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                      activeTab === "محتوى الدورة"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    محتوى الدورة
                  </button>
                  <button
                    onClick={() => setActiveTab("المدرس")}
                    className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                      activeTab === "المدرس"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    المدرس
                  </button>
                  <button
                    onClick={() => setActiveTab("التقييمات")}
                    className={`py-4 px-4 font-semibold focus:outline-none transition-colors duration-200 ${
                      activeTab === "التقييمات"
                        ? "text-blue-600 border-b-4 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    التقييمات
                  </button>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === "الوصف" && (
                    <div className="animate-fade-in">
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {selectedCourse.description}
                      </p>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-100 rounded-xl">
                          <span className="font-semibold text-gray-700">
                            المدة:
                          </span>{" "}
                          {selectedCourse.duration}
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                          <span className="font-semibold text-gray-700">
                            عدد الدروس:
                          </span>{" "}
                          {selectedCourse.lessons}
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                          <span className="font-semibold text-gray-700">
                            السعر:
                          </span>{" "}
                          {selectedCourse.price}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                        ماذا ستتعلم
                      </h3>
                      <ul className="text-gray-700 space-y-2 list-none">
                        {selectedCourse.learnings.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 font-bold text-2xl mr-2">
                              &bull;
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "محتوى الدورة" && (
                    <div className="animate-fade-in">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        محتوى الدورة التدريبية
                      </h3>
                      <div className="space-y-4">
                        {selectedCourse.courseContent.map((module, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-xl"
                          >
                            <h4 className="font-semibold text-lg text-gray-800">
                              {module.title}
                            </h4>
                            <ul className="mt-2 list-none space-y-1 text-gray-700">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li
                                  key={lessonIndex}
                                  className="flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-blue-500 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "المدرس" && (
                    <div className="animate-fade-in">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {selectedCourse.teacher}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedCourse.instructorDetails}
                      </p>
                    </div>
                  )}

                  {activeTab === "التقييمات" && (
                    <div className="animate-fade-in">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        تقييمات الطلاب
                      </h3>
                      <p className="text-gray-600">
                        هنا سيتم عرض تقييمات الطلاب قريباً.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentCourses;
