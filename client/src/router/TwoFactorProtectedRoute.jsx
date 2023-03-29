import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

function TwoFactorProtectedRoute({ children }) {
  const { twoFactorUser } = useContext(AppContext);

  if (!twoFactorUser.current) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default TwoFactorProtectedRoute;
