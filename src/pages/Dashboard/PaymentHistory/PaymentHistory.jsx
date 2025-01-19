import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", `${user?.email}`, page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/${user.email}?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  return (
    <div className="p-1 mb-8 mt-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        Payment History
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
              <th>Camp Fees</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.result?.map((payment, idx) => (
              <tr key={payment._id} className="hover">
                <th>{idx + 1}</th>
                <td>{payment.campName}</td>
                <td>${payment.campFee}</td>
                <td className="text-green-600">${payment.transactionId}</td>
                <td>{payment.status}</td>
                <td>{payment.confirmationStatus}</td>
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
          Page {page} of {payments.totalPages}
        </span>
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() =>
            setPage((prev) =>
              payments.totalPages
                ? Math.min(prev + 1, payments.totalPages)
                : prev
            )
          }
          disabled={page === payments.totalPages}
        >
          <span className="text-lg font-semibold">Next</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
