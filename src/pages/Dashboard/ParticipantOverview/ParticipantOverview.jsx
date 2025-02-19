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

const StatsCard = ({ title, value }) => (
  <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none flex flex-col items-center">
    <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl md:text-3xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none">
    <h3 className="text-base md:text-lg font-semibold mb-4 text-center">{title}</h3>
    {children}
  </div>
);

const ActivityTable = ({ activities }) => (
  <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg shadow-card-shadow dark:shadow-none overflow-x-auto">
    <h3 className="text-base md:text-lg font-semibold mb-4">Camp Payment Details</h3>
    <table className="min-w-full text-xs md:text-sm">
      <thead>
        <tr className="bg-primary text-secondary">
          <th className="p-2 text-left">Camp Name</th>
          <th className="p-2 text-left">Camp Fee</th>
          <th className="p-2 text-left">Amount Paid</th>
          <th className="p-2 text-left">Payment Status</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((camp, idx) => (
          <tr key={idx} className="border-b dark:border-gray-600">
            <td className="p-2">{camp.campName}</td>
            <td className="p-2">${camp.campFees}</td>
            <td className="p-2">${camp.amountPaid}</td>
            <td className="p-2 capitalize">{camp.paymentStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Helmet>
        <title>MediCamp | Participant Overview</title>
      </Helmet>

      <header className="mb-6">
        <SectionTitle title="Overview" />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCard title="Total Registered Camps" value={totalRegistered} />
        <StatsCard title="Total Amount Paid" value={`$${totalPaid}`} />
        <StatsCard title="Due Amount" value={`$${totalDueAmount}`} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Camp Payment Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData}>
              <XAxis dataKey="campName" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="campFees" fill="#003366" name="Camp Fee" />
              <Bar dataKey="amountPaid" fill="#01dfdf" name="Amount Paid" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
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

      <section>
        <ActivityTable activities={processedData} />
      </section>
    </div>
  );
};

export default ParticipantOverview;
