import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../pages/HomePage/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'available-camps',
            element: <AvailableCamps></AvailableCamps>
        }
    ]
  },
]);
