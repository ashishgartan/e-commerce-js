// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // or useContext if using context

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  // OR: const isLoggedIn = localStorage.getItem("token") !== null;

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
