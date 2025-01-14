import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";

const CampDetails = () => {
  const { id } = useParams();
  const { data: camp = [] } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/camp/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    campName,
    image,
    campFees,
    date,
    time,
    location,
    healthcareProfessional,
    participantCount,
    description,
  } = camp;
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
                <FaCalendarAlt /> {date}
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> {time}
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
              {healthcareProfessional}
            </p>
            <p className="flex items-center gap-1 text-3xl">
              <FaUsers className="text-description" />
              {participantCount}
            </p>

            <p className="text-3xl">{description}</p>
          </div>
        </div>
        <div className="flex justify-end px-6 pb-6">
          <Link
            to={`/camp-details/${_id}`}
            className="btn bg-primary hover:bg-primary-hover"
          >
            Join Camp
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampDetails;
