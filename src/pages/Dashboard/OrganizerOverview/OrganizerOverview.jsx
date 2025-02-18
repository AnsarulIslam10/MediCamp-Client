import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import useAuth from "../../../hooks/useAuth";

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

  const {
    data: totalRevenue = 0,
    isLoading: isRevenueLoading,
    isError: isRevenueError,
  } = useQuery({
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

  const { data: paymentStatusData = [] } = useQuery({
    queryKey: ["paymentStatusData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      const payments = res.data.result;
      const unpaid = payments.filter((payment) => payment.paymentStatus === "paid").length;
      const paid = payments.length + unpaid;
      return [
        { name: "paid", value: paid },
        { name: "Unpaid", value: unpaid },
      ];
    },
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-camps");
      return res.data.result.slice(0, 5);
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

  const updatePaymentStatus = async () => {
    const res = await axiosSecure.get("/payments");
    const payments = res.data.result;

    const unpaidPayments = payments.filter((payment) => payment.paymentStatus === "unpaid");

    await Promise.all(
      unpaidPayments.map((payment) =>
        axiosSecure.put(`/payments/${payment._id}`, {
          paymentStatus: "paid",
        })
      )
    );
  };

  if (isRevenueLoading) return <Loading />;
  if (isRevenueError) return <div>Error fetching payments.</div>;

  const COLORS = ["#01dfdf", "#003366"];

  return (
    <div className="p-6 space-y-8">
      <Helmet>
        <title>MediCamp | Organizer Overview</title>
      </Helmet>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">Organizer Overview</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Camps</h3>
          <p className="text-2xl font-bold">{totalCamps}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Participants</h3>
          <p className="text-2xl font-bold">{totalParticipants}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#003366"
                dataKey="value"
                label
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Registrations</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Camp Name</th>
              <th className="p-2">Participant</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity._id} className="border-b">
                <td className="p-2">{activity.campName}</td>
                <td className="p-2">{activity.participantName}</td>
                <td className="p-2">{activity.confirmationStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Camps</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Camp Name</th>
              <th className="p-2 text-left">Date & Time</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Participants</th>
            </tr>
          </thead>
          <tbody>
            {organizerCamps.result.map((camp) => (
              <tr key={camp._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{camp.campName}</td>
                <td className="p-2">{camp.dateTime}</td>
                <td className="p-2">{camp.location}</td>
                <td className="p-2">{camp.participantCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Camp Name</th>
              <th className="p-2 text-left">Feedback</th>
              <th className="p-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{feedback.campName}</td>
                <td className="p-2">{feedback.message}</td>
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
