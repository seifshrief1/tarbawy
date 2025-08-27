import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const STORAGE_KEY = "app_current_user";

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    phone: "",
    studentGrade: "first",
    teacherSubject: "",
    teacherExperience: "",
    teacherBio: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const persistUser = (userObj) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
    } catch {}
  };
  const readPersistedUser = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const clearPersistedUser = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      !userData.phone ||
      (userData.role === "teacher" &&
        (!userData.teacherSubject ||
          !userData.teacherExperience ||
          !userData.teacherBio))
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة.");
      return;
    } else {
      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
        });

        if (signUpError) {
          toast.error(signUpError.message);
          return;
        }

        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password,
          });

        if (signInError) {
          toast.error(signInError.message);
          return;
        }

        const { data: userInsert, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              userName: userData.username,
              email: userData.email,
              role: userData.role,
              phone: userData.phone,
              studentGrade:
                userData.role === "student" ? userData.studentGrade : null,
              teacherSubject:
                userData.role === "teacher" ? userData.teacherSubject : null,
              teacherExperience:
                userData.role === "teacher" ? userData.teacherExperience : null,
              teacherBio:
                userData.role === "teacher" ? userData.teacherBio : null,
            },
          ])
          .select()
          .single();

        if (insertError) {
          toast.error(insertError.message);
          return;
        }

        if (userInsert) {
          toast.success("تم إنشاء الحساب بنجاح!.");
          setCurrentUser(userInsert);
          persistUser(userInsert);

          if (userInsert.role === "student") {
            navigate("/");
          } else {
            navigate("/teacher/teacherCourses");
          }
        }
      } catch (err) {
        toast.error(err.message || "حدث خطأ غير متوقع");
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      toast.error(
        error.message == "Invalid login credentials"
          ? "لا يوجد مستخدم بهذا البريد الإلكتروني أو كلمة المرور غير صحيحة."
          : error.message
      );
      return;
    }

    if (data) {
      toast.success("تم تسجيل الدخول بنجاح!.");
      fetchUser(userData.email);
    }
  };

  const fetchUser = async (email) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setCurrentUser(data);
      persistUser(data);
    }
  };

  useEffect(() => {
    const cached = readPersistedUser();
    if (cached) setCurrentUser(cached);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        fetchUser(session.user.email);
      } else {
        setCurrentUser(null);
        clearPersistedUser();
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user?.email) {
          fetchUser(session.user.email);
        } else {
          setCurrentUser(null);
          clearPersistedUser();
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const currentPath = window.location.pathname;

    if (currentUser.role === "student" && currentPath === "/signin") {
      navigate("/");
    } else if (currentUser.role === "teacher" && currentPath === "/signin") {
      navigate("/teacher/teacherCourses");
    }
  }, [currentUser, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    clearPersistedUser();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
