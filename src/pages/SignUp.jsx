import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const { userData, setUserData, handleSignUp } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
          Tarbawy - تربوي
        </h1>

        <form className="space-y-5">
          {/* Username */}
          <input
            type="text"
            placeholder="اسم المستخدم"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="رقم الهاتف"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />

          {/* Role selection */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={userData.role === "student"}
                onChange={() => setUserData({ ...userData, role: "student" })}
                className="accent-blue-600"
              />
              <span>طالب</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={userData.role === "teacher"}
                onChange={() => setUserData({ ...userData, role: "teacher" })}
                className="accent-blue-600"
              />
              <span>مدرس</span>
            </label>
          </div>

          {/* Conditional inputs */}
          {userData.role === "student" && (
            <select
              value={userData.studentGrade}
              onChange={(e) =>
                setUserData({ ...userData, studentGrade: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="first">الصف الأول الإعدادي</option>
              <option value="second">الصف الثاني الإعدادي</option>
              <option value="third">الصف الثالث الإعدادي</option>
            </select>
          )}

          {userData.role === "teacher" && (
            <>
              <input
                type="text"
                placeholder="المادة التي تدرسها"
                value={userData.teacherSubject}
                onChange={(e) =>
                  setUserData({ ...userData, teacherSubject: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="سنوات الخبرة"
                value={userData.teacherExperience}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    teacherExperience: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="نبذة عنك"
                value={userData.teacherBio}
                onChange={(e) =>
                  setUserData({ ...userData, teacherBio: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <button
            onClick={(e) => handleSignUp(e, userData)}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            إنشاء حساب
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          لديك حساب؟{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-semibold hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
