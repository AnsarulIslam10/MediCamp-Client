import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: registeredCamps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", `${user?.email}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(registeredCamps);
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
            {registeredCamps.map((camp, idx) => (
              <tr key={camp._id} className="hover">
                <th>{idx + 1}</th>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.participantName}</td>
                <td>
                  <Link
                    disabled={camp.paymentStatus === "paid"}
                    to={{ pathname: "/dashboard/payment" }}
                    state={{campFees: camp.campFees, registeredCampId: camp._id, campId: camp.campId}}
                    className={`btn`}
                  >
                    {camp.paymentStatus === "unpaid" ? "Pay" : "Paid"}
                  </Link>
                </td>
                <td>{camp.confirmationStatus}</td>
                <td>
                  <button onClick={() => handleDelete(camp._id)}>
                    <FcCancel />
                  </button>
                </td>
                <td>{camp.paymentStatus === "unpaid" ? "N/A" : "Feedback"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
