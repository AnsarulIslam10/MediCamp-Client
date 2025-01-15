import moment from "moment";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
  FaClock,
  FaDollarSign,
  FaLocationDot,
  FaUserDoctor,
  FaUsers,
} from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";

const CampCard = ({ item }) => {
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
  } = item || {};
  const formatedDate = moment(dateTime).format('L')
  const formatedTime = moment(dateTime).format('LT')
  return (
    <div className="card flex bg-white shadow-card-shadow">
      <div className="relative">
        <figure>
          <img
            className="rounded-t-2xl object-cover w-full mb-2"
            src={image}
            alt="camp"
          />
        </figure>
        <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
          <FaDollarSign />
          {campFees}
        </p>
      </div>
      <div className="p-6 flex-1 space-y-1 pt-0">
      <div className="flex justify-between text-description">
          <p className="flex items-center gap-1">
            <FaCalendarAlt /> {formatedDate}
          </p>
          <p className="flex items-center gap-1">
            <FaClock /> {formatedTime}
          </p>
        </div>

        <h2 className="card-title text-2xl flex items-center gap-1">
          <MdCampaign className="text-description text-lg" />
          {campName}
        </h2>
        <p className="flex items-center gap-1 text-xl">
          <FaUserDoctor className="text-description" />
          {healthcareProfessionalName}
        </p>
        <p className="flex items-center gap-1 text-xl">
          <FaUsers className="text-description" />
          {participantCount}
        </p>
        <p className="text-description flex items-center gap-1">
          <FaLocationDot className="text-xl" /> {location}
        </p>
      </div>
      <div className="flex justify-end px-6 pb-6">
        <Link
          to={`/camp-details/${_id}`}
          className="btn bg-primary hover:bg-primary-hover"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CampCard;
