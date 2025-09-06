import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Loading from "../../../components/Shared/Loading";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Stats card
const StatsCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center">
    <h3 className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
      {title}
    </h3>
    <p className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-2">
      {icon} {value}
    </p>
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
const DataTable = ({ title, columns, data }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md overflow-x-auto">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
    <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
      <thead>
        <tr className="bg-primary text-white text-left">
          {columns.map((col, idx) => (
            <th key={idx} className="p-3">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={`${
              idx % 2 === 0 ? "bg-gray-50 dark:bg-slate-800" : "bg-white dark:bg-slate-900"
            } hover:bg-gray-100 dark:hover:bg-slate-700 transition`}
          >
            {Object.values(row).map((val, i) => (
              <td key={i} className="p-3">{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrganizerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch data
  const { data: totalCamps = 0 } = useQuery({
    queryKey: ["totalCamps"],
    queryFn: async () => (await axiosSecure.get("/all-camps")).data.totalCount,
  });

  const { data: totalParticipants = 0 } = useQuery({
    queryKey: ["totalParticipants"],
    queryFn: async () => (await axiosSecure.get("/registered-camps")).data.totalCount,
  });

  const { data: totalRevenue = 0, isLoading: isRevenueLoading, isError: isRevenueError } = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: async () => {
      const payments = (await axiosSecure.get("/payments")).data.result;
      return payments.reduce((sum, p) => sum + p.campFee, 0);
    },
  });

  const { data: popularCamps = [] } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      return (await axiosSecure.get("/popular-camps")).data.map((c) => ({
        name: c.campName,
        participants: c.participantCount,
      }));
    },
  });

  const { data: revenueByCamp = [] } = useQuery({
    queryKey: ["revenueByCamp"],
    queryFn: async () => {
      const payments = (await axiosSecure.get("/payments")).data.result;
      const revenueMap = {};
      payments.forEach((p) => (revenueMap[p.campName] = (revenueMap[p.campName] || 0) + p.campFee));
      return Object.keys(revenueMap).map((name) => ({ name, revenue: revenueMap[name] }));
    },
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["recentActivities"],
    queryFn: async () => (await axiosSecure.get("/registered-camps")).data.result.slice(-5).reverse(),
  });

  const { data: organizerCamps = { result: [] } } = useQuery({
    queryKey: ["organizerCamps", user.email],
    queryFn: async () => (await axiosSecure.get(`/camps/organizer/${user.email}`)).data,
  });

  const { data: feedbackData = [] } = useQuery({
    queryKey: ["feedbackData"],
    queryFn: async () => (await axiosSecure.get("/feedback")).data.slice(0, 5),
  });

  if (isRevenueLoading) return <Loading />;
  if (isRevenueError) return <div>Error fetching payments.</div>;

  const barColors = ["#003366", "#01dfdf"];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10">
      <Helmet>
        <title>MediCamp | Organizer Overview</title>
      </Helmet>

      <header>
        <SectionTitle title="Organizer Overview" />
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatsCard title="Total Camps" value={totalCamps} icon={<MdCampaign />} />
        <StatsCard title="Total Participants" value={totalParticipants} icon={<FaUsers />} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue}`} icon={<FaDollarSign />} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Most Popular Camps">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={popularCamps}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill={barColors[0]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Camp">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueByCamp}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill={barColors[1]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 gap-6">
        <DataTable
          title="Recent Registrations"
          columns={["Camp Name", "Participant", "Status"]}
          data={recentActivities.map((act) => ({
            campName: act.campName,
            participantName: act.participantName,
            confirmationStatus: act.confirmationStatus,
          }))}
        />

        <DataTable
          title="Your Camps"
          columns={["Camp Name", "Date & Time", "Location", "Participants"]}
          data={organizerCamps.result.map((c) => ({
            campName: c.campName,
            dateTime: c.dateTime,
            location: c.location,
            participantCount: c.participantCount,
          }))}
        />

        <DataTable
          title="Recent Feedback"
          columns={["Camp Name", "Feedback", "Rating"]}
          data={feedbackData.map((f) => ({
            campName: f.campName,
            feedback: f.feedback.slice(0, 80) + "...",
            rating: f.rating,
          }))}
        />
      </section>
    </div>
  );
};

export default OrganizerOverview;
