import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(payments);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">
        Payment History
      </h1>
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
            {payments?.map((payment, idx) => (
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
    </div>
  );
};

export default PaymentHistory;
