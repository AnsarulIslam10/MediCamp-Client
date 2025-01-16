import { useQuery } from "@tanstack/react-query";
import React from "react";

import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    data: manageCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-camps", `${user?.email}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/organizer/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camp/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: `Camp has been deleted.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  console.log(manageCamps);
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">
        Manage Camps
      </h1>
      <div className="overflow-x-auto shadow-card-shadow">
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
                  <Link to={`/dashboard/update-camp/${camp._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(camp._id)}>
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
