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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";

// Stats card
const StatsCard = ({ title, value }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
    <h3 className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
      {title}
    </h3>
    <p className="text-3xl md:text-4xl font-bold text-primary">{value}</p>
  </div>
);

// Chart wrapper
const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
      {title}
    </h3>
    {children}
  </div>
);

// Table
const ActivityTable = ({ activities }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
      Camp Payment Details
    </h3>
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-primary text-white text-left">
            <th className="p-3">Camp Name</th>
            <th className="p-3">Camp Fee</th>
            <th className="p-3">Amount Paid</th>
            <th className="p-3">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((camp, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0
                  ? "bg-gray-50 dark:bg-slate-800"
                  : "bg-white dark:bg-slate-900"
              } hover:bg-gray-100 dark:hover:bg-slate-700 transition`}
            >
              <td className="p-3">{camp.campName}</td>
              <td className="p-3 font-medium">${camp.campFees}</td>
              <td className="p-3 font-medium text-primary">
                ${camp.amountPaid}
              </td>
              <td
                className={`p-3 capitalize font-semibold ${
                  camp.paymentStatus === "paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {camp.paymentStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ParticipantOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: analyticsData = [], isLoading, isError } = useQuery({
    queryKey: ["analyticsData", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading analytics data.</div>;

  const processedData = analyticsData.map((camp) => ({
    ...camp,
    paymentStatus: camp.amountPaid > 0 ? "paid" : "unpaid",
  }));

  const totalRegistered = processedData.length;
  const totalPaid = processedData.reduce((sum, camp) => sum + camp.amountPaid, 0);
  const totalDueAmount = processedData.reduce(
    (sum, camp) => sum + (camp.paymentStatus === "unpaid" ? camp.campFees : 0),
    0
  );

  const paidCount = processedData.filter((camp) => camp.paymentStatus === "paid").length;
  const unpaidCount = processedData.filter((camp) => camp.paymentStatus === "unpaid").length;

  const pieData = [
    { name: "Paid", value: paidCount },
    { name: "Unpaid", value: unpaidCount },
  ];

  const COLORS = ["#01dfdf", "#003366"];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10">
      <Helmet>
        <title>MediCamp | Participant Overview</title>
      </Helmet>

      {/* Section Title */}
      <header>
        <SectionTitle title="Participant Overview" />
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatsCard title="Total Registered Camps" value={totalRegistered} />
        <StatsCard title="Total Amount Paid" value={`$${totalPaid}`} />
        <StatsCard title="Due Amount" value={`$${totalDueAmount}`} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Camp Payment Comparison">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={processedData}>
              <XAxis dataKey="campName" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campFees" fill="#003366" name="Camp Fee" radius={[6, 6, 0, 0]} />
              <Bar dataKey="amountPaid" fill="#01dfdf" name="Amount Paid" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Table */}
      <section>
        <ActivityTable activities={processedData} />
      </section>
    </div>
  );
};

export default ParticipantOverview;
