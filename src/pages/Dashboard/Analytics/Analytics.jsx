import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`;
};
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <ResponsiveContainer width="100%" height={500} className={"mt-16"}>
      <h2 className="text-4xl font-bold text-center mb-8">Analytics</h2>
      <BarChart
        data={analyticsData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 120,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="campName" angle={-50} textAnchor="end" />
        <YAxis />
        <Bar
          dataKey="amountPaid"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {analyticsData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Analytics;
