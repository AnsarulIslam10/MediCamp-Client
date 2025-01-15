import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: manageCamps = [], isLoading } = useQuery({
    queryKey: ["manage-camps", `${user?.email}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/organizer/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(manageCamps);
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">
        Manage Camps
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-primary">
              <th></th>
              <th>Camp Name</th>
              <th>Date & Time</th>
              <th>Healthcare Professional</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {manageCamps.map((camp, idx) => (
              <tr key={camp._id} className="hover">
                <th>{idx + 1}</th>
                <td>{camp.campName}</td>
                <td>{moment(camp.dateTime).format("L, LT")}</td>
                <td>{camp.healthcareProfessionalName}</td>
                <td>
                  <button>
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;
