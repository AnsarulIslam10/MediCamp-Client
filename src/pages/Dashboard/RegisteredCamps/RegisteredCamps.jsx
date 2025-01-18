import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import { BiX } from "react-icons/bi";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: registeredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", `${user?.email}`, page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps/${user?.email}?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
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
        const res = await axiosSecure.delete(`/registered-camps/${id}`);
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
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">
        Registered Camps
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-primary">
              <th></th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {registeredCamps.result?.map((camp, idx) => (
              <tr key={camp._id} className="hover">
                <th>{idx + 1}</th>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td>
                  <Link
                    disabled={camp.paymentStatus === "paid"}
                    to={{ pathname: "/dashboard/payment" }}
                    state={{
                      campName: camp.campName,
                      campFees: camp.campFees,
                      registeredCampId: camp._id,
                      campId: camp.campId,
                      confirmationStatus: camp.confirmationStatus,
                    }}
                    className={`btn`}
                  >
                    {camp.paymentStatus === "unpaid" ? "Pay" : "Paid"}
                  </Link>
                </td>
                <td>{camp.confirmationStatus}</td>
                <td>
                  <button
                    disabled={camp.paymentStatus === "paid"}
                    className="disabled:text-gray-500 text-xl"
                    onClick={() => handleDelete(camp._id)}
                  >
                    <BiX />
                  </button>
                </td>
                <td>
                  <FeedbackModal camp={camp}></FeedbackModal>
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
          <span className="text-lg font-semibold">Prev</span>
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {page} of {registeredCamps.totalPages}
        </span>
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() =>
            setPage((prev) =>
              registeredCamps.totalPages
                ? Math.min(prev + 1, registeredCamps.totalPages)
                : prev
            )
          }
          disabled={page === registeredCamps.totalPages}
        >
          <span className="text-lg font-semibold">Next</span>
        </button>
      </div>
    </div>
  );
};

export default RegisteredCamps;
