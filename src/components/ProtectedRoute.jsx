import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, notAllowedRoles }) => {
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData?.role;

  if (!authToken) {
    return <Navigate to="/home" state={{ from: location }} />;
  }

  if (notAllowedRoles && notAllowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
