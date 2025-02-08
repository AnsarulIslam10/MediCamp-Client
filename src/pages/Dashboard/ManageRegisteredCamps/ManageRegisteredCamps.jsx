import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ManageRegisteredCamps = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: manageRegisteredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-registered-camps", page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const handleConfirmationStatus = async (email, campId) => {
    const res = await axiosSecure.patch(`/registered-camps/${email}`, {
      confirmationStatus: "confirmed",
      campId: campId,
    });
    if (res.data.modifiedCount > 0) {
      toast.success("Confirmation status updated");
      refetch();
    } else {
      toast.success("Faild to update");
    }
  };

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
    <div className="p-1 mb-8 mt-16">
      <Helmet>
        <title>MediCamp | Manage Registered Camps</title>
      </Helmet>
      <SectionTitle
        title={"Manage Registered Camps"}
        sub={"Track and Manage All The Registered Camps"}
      ></SectionTitle>
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
            <tr className="bg-primary text-secondary">
              <th></th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {manageRegisteredCamps.result?.map((camp, idx) => (
              <tr key={camp._id} className="hover">
                <th>{idx + 1}</th>
                <td>{camp.participantName}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.paymentStatus}</td>
                <td>
                  <button
                    disabled={camp.confirmationStatus === "confirmed"}
                    onClick={() =>
                      handleConfirmationStatus(
                        camp.participantEmail,
                        camp.campId
                      )
                    }
                    className="btn btn-xs disabled:bg-primary disabled:text-gray-400 bg-primary hover:bg-primary-hover"
                  >
                    {camp.confirmationStatus}
                  </button>
                </td>
                <td>
                  <button
                    disabled={
                      camp.paymentStatus === "paid" &&
                      camp.confirmationStatus === "confirmed"
                    }
                    onClick={() => handleDelete(camp._id)}
                    className="disabled:text-gray-300 text-2xl"
                  >
                    <BiX />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          className="btn bg-primary border-none px-6 py-2 btn-circle shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <span className="text-lg font-semibold"><FaChevronLeft /></span>
        </button>
        <span className="text-lg btn rounded-none font-bold text-gray-700">
          {page}
        </span>
        <button
          className="btn bg-primary border-none px-6 py-2 btn-circle shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() =>
            setPage((prev) =>
              manageRegisteredCamps.totalPages
                ? Math.min(prev + 1, manageRegisteredCamps.totalPages)
                : prev
            )
          }
          disabled={page === manageRegisteredCamps.totalPages}
        >
          <span className="text-lg font-semibold"><FaChevronRight /></span>
        </button>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
