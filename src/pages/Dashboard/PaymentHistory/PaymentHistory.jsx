import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
      <Helmet>
        <title>MediCamp | Payment History</title>
      </Helmet>
      <SectionTitle
        title={"Payment History"}
        sub={"Track All Your Camp Payments"}
      ></SectionTitle>
      {payments?.result?.length > 0 ? (
        <>
          <div className="flex justify-end mb-2">
            <label className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
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
          <div className="overflow-x-auto shadow-card-shadow dark:shadow-none dark:bg-slate-900">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-primary text-secondary">
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
                  <tr key={payment._id} className="dark:border-gray-600">
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
                  payments.totalPages
                    ? Math.min(prev + 1, payments.totalPages)
                    : prev
                )
              }
              disabled={page === payments.totalPages}
            >
              <span className="text-lg font-semibold"><FaChevronRight /></span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 text-center mt-16">
          No data found
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
