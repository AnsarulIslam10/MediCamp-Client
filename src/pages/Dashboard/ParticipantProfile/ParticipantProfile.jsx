import React from "react";
import useAuth from "../../../hooks/useAuth";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { Helmet } from "react-helmet-async";

const ParticipantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-1">
      <Helmet>
        <title>MediCamp | Participant Profile</title>
      </Helmet>
      <div className="text-center mt-16 shadow-card-shadow p-10">
        <div className="avatar mb-4">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src={userData.photoURL} />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p>{userData.email}</p>
          {userData?.phoneNumber && <p>{userData.phoneNumber}</p>}
          {userData?.address && <p>{userData.address}</p>}
        </div>
        <UpdateProfileModal
          refetch={refetch}
          userData={userData}
        ></UpdateProfileModal>
      </div>
    </div>
  );
};

export default ParticipantProfile;
