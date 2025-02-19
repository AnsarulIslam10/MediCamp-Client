import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import useAuth from "../../../hooks/useAuth";
import { MdCampaign } from "react-icons/md";
import { FaDollarSign, FaUsers } from "react-icons/fa";

const OrganizerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: totalCamps = 0 } = useQuery({
    queryKey: ["totalCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-camps");
      return res.data.totalCount;
    },
  });

  const { data: totalParticipants = 0 } = useQuery({
    queryKey: ["totalParticipants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-camps");
      return res.data.totalCount;
    },
  });

  const { data: totalRevenue = 0, isLoading: isRevenueLoading, isError: isRevenueError } = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      const payments = res.data.result;
      const revenue = payments.reduce((sum, payment) => sum + payment.campFee, 0);
      return revenue;
    },
  });

  const { data: popularCamps = [] } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-camps");
      return res.data.map((camp) => ({
        name: camp.campName,
        participants: camp.participantCount,
      }));
    },
  });

  const { data: revenueByCamp = [] } = useQuery({
    queryKey: ["revenueByCamp"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      const payments = res.data.result;
      const revenueMap = {};
      payments.forEach((payment) => {
        if (revenueMap[payment.campName]) {
          revenueMap[payment.campName] += payment.campFee;
        } else {
          revenueMap[payment.campName] = payment.campFee;
        }
      });
      return Object.keys(revenueMap).map((campName) => ({
        name: campName,
        revenue: revenueMap[campName],
      }));
    },
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-camps");
      return res.data.result.slice(-5).reverse();
    },
  });

  const { data: organizerCamps = { result: [] } } = useQuery({
    queryKey: ["organizerCamps", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/organizer/${user.email}`);
      return res.data;
    },
  });

  const { data: feedbackData = [] } = useQuery({
    queryKey: ["feedbackData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data.slice(0, 5);
    },
  });

  if (isRevenueLoading) return <Loading />;
  if (isRevenueError) return <div>Error fetching payments.</div>;

  const COLORS = ["#01dfdf", "#003366"];

  return (
    <div className="p-4 md:p-6 space-y-8">
      <Helmet>
        <title>MediCamp | Organizer Overview</title>
      </Helmet>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Organizer Overview</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
          <h3 className="text-lg font-semibold">Total Camps</h3>
          <p className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
            <MdCampaign className="text-3xl md:text-4xl" /> {totalCamps}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
          <h3 className="text-lg font-semibold">Total Participants</h3>
          <p className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
            <FaUsers className="text-2xl md:text-3xl" /> {totalParticipants}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
            <FaDollarSign className="text-2xl md:text-3xl" /> {totalRevenue}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
          <h3 className="text-lg font-semibold mb-4">Most Popular Camps</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularCamps}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#003366" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
          <h3 className="text-lg font-semibold mb-4">Revenue by Camp</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCamp}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#01dfdf" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none mb-8 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Registrations</h3>
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-primary text-secondary">
              <th className="p-2">Camp Name</th>
              <th className="p-2">Participant</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity._id} className="border-b dark:border-gray-600">
                <td className="p-2">{activity.campName}</td>
                <td className="p-2">{activity.participantName}</td>
                <td className="p-2">{activity.confirmationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none mb-8 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Your Camps</h3>
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-primary text-secondary">
              <th className="p-2 text-left">Camp Name</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Participants</th>
            </tr>
          </thead>
          <tbody>
            {organizerCamps.result.map((camp) => (
              <tr key={camp._id} className="border-b hover:bg-gray-50 dark:border-gray-600">
                <td className="p-2">{camp.campName}</td>
                <td className="p-2">{camp.dateTime}</td>
                <td className="p-2">{camp.location}</td>
                <td className="p-2">{camp.participantCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-primary text-secondary">
              <th className="p-2 text-left">Camp Name</th>
              <th className="p-2 text-left">Feedback</th>
              <th className="p-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 dark:border-gray-600">
                <td className="p-2">{feedback.campName}</td>
                <td className="p-2">{feedback.feedback.slice(0, 80)}...</td>
                <td className="p-2">{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerOverview;
