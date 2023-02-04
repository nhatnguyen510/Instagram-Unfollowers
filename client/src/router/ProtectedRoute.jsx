import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);

  if (Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
