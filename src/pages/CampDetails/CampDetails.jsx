import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import moment from "moment";
import JoinCampModal from "../../components/Modal/JoinCampModal";
import useAuth from "../../hooks/useAuth";

const CampDetails = () => {
  const {user} = useAuth()
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
    <section className="my-16 max-w-6xl mx-auto px-2">
      <div className="card flex bg-white shadow-card-shadow">
        <figure>
          <img className="rounded-t-2xl" src={image} alt="camp" />
        </figure>
        <div>
          <div className="p-6 flex-1 space-y-2 pt-0">
            <div className="flex justify-between text-2xl text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> {formatedDate}
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> {formatedTime}
              </p>
            </div>
            <h2 className="card-title text-4xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              {campName}
            </h2>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-3xl" /> {location}
            </p>
            <p className="text-3xl font-semibold flex items-center">
              <FaDollarSign />
              {campFees} / per person
            </p>

            <p className="flex items-center gap-1 text-3xl">
              <FaUserDoctor className="text-description" />
              {healthcareProfessionalName}
            </p>
            <p className="flex items-center gap-1 text-3xl">
              <FaUsers className="text-description" />
              {participantCount}
            </p>

            <p className="text-3xl">{description}</p>
          </div>
        </div>
        <div className="flex justify-end px-6 pb-6">
          <JoinCampModal camp={camp} refetch={refetch}></JoinCampModal>
        </div>
      </div>
    </section>
  );
};

export default CampDetails;
