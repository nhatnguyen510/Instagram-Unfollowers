import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import ProtectedRoute from "./ProtectedRoute";

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
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
        ],
      },
    ],
  },
]);
