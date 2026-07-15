import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../layoutes/RootLayout";
import { Home } from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { About } from "../pages/Dashboard/About/About";
import { Profile } from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Application } from "../pages/Applications/Application";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path:'/application',
        element: <Application></Application>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path:"/profile",
        element:<Profile></Profile>
      }
    ],
  },
]);
