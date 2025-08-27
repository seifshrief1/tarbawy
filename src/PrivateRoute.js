import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname.startsWith("/teacher")) {
      navigate("/", { replace: true });
      return;
    }

    if (currentUser) {
      if (currentUser.role === "teacher" && !location.pathname.startsWith("/teacher")) {
        navigate("/teacher/teacherCourses", { replace: true });
        return;
      }

      if (currentUser.role === "student" && location.pathname.startsWith("/teacher")) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, [currentUser, location.pathname, navigate]);

  return children;
};

export default PrivateRoute;
