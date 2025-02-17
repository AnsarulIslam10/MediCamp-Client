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
  } = item || {};
  const formatedDate = moment(dateTime).format("L");
  const formatedTime = moment(dateTime).format("LT");
  return (
    <div className="card h-[100%] rounded-none flex bg-white dark:bg-slate-900 shadow-card-shadow hover:scale-105 transition-all duration-300">
      <div className="relative">
        <figure>
          <img
            className="aspect-video object-cover w-full mb-2"
            src={image}
            alt="camp"
          />
        </figure>
        <p className="absolute top-4 right-4 bg-primary text-2xl px-3 drop-shadow-md rounded-full font-medium flex items-center">
          <FaDollarSign className="text-xl mt-[2px]" />
          {campFees}
        </p>
      </div>
      <div className="p-6 flex-1 space-y-1 pt-0">
        <div className="flex justify-between text-description dark:text-gray-200">
          <p className="flex items-center gap-1">
            <FaCalendarAlt /> {formatedDate}
          </p>
          <p className="flex items-center gap-1">
            <FaClock /> {formatedTime}
          </p>
        </div>

        <h2 className="card-title text-secondary dark:text-primary sm:text-xl lg:text-2xl flex items-center gap-1">
          <MdCampaign className="text-description dark:text-gray-200 text-lg" />
          {campName}
        </h2>
        <p className="flex items-center gap-1 text-xl">
          <FaUserDoctor className="text-description dark:text-gray-200" />
          {healthcareProfessionalName}
        </p>
        <p className="flex items-center gap-1 text-xl">
          <FaUsers className="text-description dark:text-gray-200" />
          {participantCount}
        </p>
        <p className="text-description dark:text-gray-200 flex items-center gap-1">
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
