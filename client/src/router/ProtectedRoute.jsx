import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn.current) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
