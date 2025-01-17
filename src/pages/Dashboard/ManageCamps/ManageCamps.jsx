import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

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

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: manageCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-camps", `${user?.email}`, page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/camps/organizer/${user?.email}?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

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
    <div className="px-4">
      <h1 className="text-4xl font-bold text-center mb-4 mt-16">
        Manage Camps
      </h1>
      <div className="flex justify-end mb-2">
        <label className="input input-bordered flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 "
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

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
            {manageCamps.result?.map((camp, idx) => (
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

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <span className="text-lg font-semibold">Previous</span>
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {page} of {manageCamps.totalPages}
        </span>
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() =>
            setPage((prev) =>
              manageCamps.totalPages
                ? Math.min(prev + 1, manageCamps.totalPages)
                : prev
            )
          }
          disabled={page === manageCamps.totalPages}
        >
          <span className="text-lg font-semibold">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ManageCamps;
