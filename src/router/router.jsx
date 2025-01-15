import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../pages/HomePage/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import ManageCamps from "../pages/Dashboard/ManageCamps/ManageCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/camp-details/:id",
        element: <CampDetails></CampDetails>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/logIn",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "organizer-profile",
        element: <OrganizerProfile></OrganizerProfile>,
      },
      {
        path: "add-camp",
        element: <AddCamp></AddCamp>,
      },
      {
        path: "manage-camps",
        element: <ManageCamps></ManageCamps>,
      },
    ],
  },
]);
