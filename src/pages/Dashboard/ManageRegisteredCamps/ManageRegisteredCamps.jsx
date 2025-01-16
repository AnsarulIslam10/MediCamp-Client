import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";
import Swal from "sweetalert2";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const ManageRegisteredCamps = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    data: manageRegisteredCamps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-registered-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleConfirmationStatus = async (email, campId) => {
    const res = await axiosSecure.patch(`/registered-camps/${email}`, {
      confirmationStatus: "confirmed",
      campId: campId
    });
    console.log(res)
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
    //   if (result.isConfirmed) {
    //     const res = await axiosSecure.delete(`/camp/${id}`);
    //     if (res.data.deletedCount > 0) {
    //       Swal.fire({
    //         title: "Deleted!",
    //         text: `Camp has been deleted.`,
    //         icon: "success",
    //       });
    //       refetch();
    //     }
    //   }
    });
  };
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">
        Manage Registered Camps
      </h1>
      <div className="overflow-x-auto shadow-card-shadow">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-primary">
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
            {manageRegisteredCamps.map((camp, idx) => (
              <tr key={camp._id} className="hover">
                <th>{idx + 1}</th>
                <td>{camp.participantName}</td>
                <td>{camp.campName}</td>
                <td>${camp.campFees}</td>
                <td>{camp.paymentStatus}</td>
                <td>
                  <button
                    onClick={() =>
                      handleConfirmationStatus(camp.participantEmail, camp.campId)
                    }
                    className="btn btn-xs bg-primary hover:bg-primary-hover"
                  >
                    {camp.confirmationStatus}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(camp._id)}>
                    <BiX />
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

export default ManageRegisteredCamps;
