import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import moment from "moment";
import JoinCampModal from "../../components/Modal/JoinCampModal";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const CampDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: camp = [], refetch } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const res = await axios.get(`https://medi-camp-server-opal.vercel.app/camp/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    campName,
    image,
    campFees,
    dateTime,
    location,
    healthcareProfessionalName,
    participantCount,
    description,
  } = camp;
  const formatedDate = moment(dateTime).format("L");
  const formatedTime = moment(dateTime).format("LT");
  return (
    <section className="my-16 max-w-7xl mx-auto px-2">
      <Helmet>
        <title>MediCamp | Camp Details</title>
      </Helmet>
      <div className="card rounded-none flex bg-white shadow-card-shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <figure>
              <img className="" src={image} alt="camp" />
            </figure>
          </div>
          <div>
            <div className="p-6 flex-1 text-2xl font-semibold space-y-4 pt-0">
              <h2 className="card-title text-secondary text-4xl mt-2">{campName}</h2>
              <p className="flex items-center gap-1">
                <FaCalendarAlt />
                Date:{" "}
                <span className="font-medium text-description">
                  {formatedDate}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FaClock />
                Time:{" "}
                <span className="font-medium text-description">
                  {formatedTime}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FaLocationDot />
                Location:{" "}
                <span className="font-medium text-description">{location}</span>
              </p>
              <p className="font-semibold flex items-center">
                <FaDollarSign className="text-[28px]" />
                Camp Fee:
                <span className="font-medium text-description ml-1">
                  ${campFees}/per person
                </span>
              </p>

              <p className="flex items-center gap-1">
                <FaUserDoctor />
                Medic:{" "}
                <span className="font-medium text-description">
                  {healthcareProfessionalName}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FaUsers />
                Participant:{" "}
                <span className="font-medium text-description">
                  {participantCount}
                </span>
              </p>
            </div>
            <div className="flex justify-end px-6">
              <JoinCampModal camp={camp} refetch={refetch}></JoinCampModal>
            </div>
          </div>
        </div>
        <div className="divider px-5"></div>
        <div className="p-6 pt-0">
          <p className="text-3xl font-semibold">Description:</p>
          <p className="text-description text-xl mt-2">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default CampDetails;
