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
import UpdateCamp from "../pages/Dashboard/ManageCamps/UpdateCamp/UpdateCamp";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import RegisteredCamps from "../pages/Dashboard/RegisteredCamps/RegisteredCamps";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./AdminRoute";
import ParticipantProfile from "../pages/Dashboard/ParticipantProfile/ParticipantProfile";
import ManageRegisteredCamps from "../pages/Dashboard/ManageRegisteredCamps/ManageRegisteredCamps";
import ParticipantRoute from "./ParticipantRoute";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import OrganizerOverview from "../pages/Dashboard/OrganizerOverview/OrganizerOverview";
import ParticipantOverview from "../pages/Dashboard/ParticipantOverview/ParticipantOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "participant-overview",
        element: (
          <ParticipantRoute>
            <ParticipantOverview></ParticipantOverview>
          </ParticipantRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ParticipantRoute>
            <Analytics></Analytics>
          </ParticipantRoute>
        ),
      },
      {
        path: "participant-profile",
        element: (
          <ParticipantRoute>
            <ParticipantProfile></ParticipantProfile>
          </ParticipantRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <ParticipantRoute>
            <RegisteredCamps></RegisteredCamps>
          </ParticipantRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ParticipantRoute>
            <Payment></Payment>
          </ParticipantRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <ParticipantRoute>
            <PaymentHistory></PaymentHistory>
          </ParticipantRoute>
        ),
      },

      //organizer route
      {
        path: "organizer-overview",
        element: (
          <AdminRoute>
            <OrganizerOverview></OrganizerOverview>
          </AdminRoute>
        ),
      },
      {
        path: "organizer-profile",
        element: (
          <AdminRoute>
            <OrganizerProfile></OrganizerProfile>
          </AdminRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <AdminRoute>
            {" "}
            <ManageCamps></ManageCamps>
          </AdminRoute>
        ),
      },
      {
        path: "manage-registered-camps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoute>
        ),
      },
      {
        path: "update-camp/:id",
        element: (
          <AdminRoute>
            <UpdateCamp></UpdateCamp>
          </AdminRoute>
        ),
      },
    ],
  },
]);
