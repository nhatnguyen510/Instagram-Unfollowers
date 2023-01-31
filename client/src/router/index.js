import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";

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
        element: <Home />,
        path: "/",
      },
    ],
  },
]);
