import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import News from "../pages/News";
import TwoFactor from "../pages/TwoFactor";
import TwoFactorProtectedRoute from "./TwoFactorProtectedRoute";

const AuthLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <TwoFactorProtectedRoute />,
        children: [
          {
            element: <TwoFactor />,
            path: "/two-factor",
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
          },

          {
            element: <News />,
            path: "/news",
          },
        ],
      },
    ],
  },
]);
