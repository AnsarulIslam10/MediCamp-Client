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

  const formatedDate = moment(dateTime).format("LL");
  const formatedTime = moment(dateTime).format("LT");

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative">
        <img
          className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={campName}
        />
        {/* Price Badge */}
        <span className="absolute top-4 right-4 bg-primary text-white text-sm sm:text-base px-3 py-1 rounded-full shadow-lg flex items-center gap-1 font-medium">
          <FaDollarSign /> {campFees}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col gap-3 flex-grow">
        {/* Date & Time */}
        <div className="flex flex-wrap justify-between text-gray-500 dark:text-gray-400 text-sm">
          <p className="flex items-center gap-1">
            <FaCalendarAlt /> {formatedDate}
          </p>
          <p className="flex items-center gap-1">
            <FaClock /> {formatedTime}
          </p>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <MdCampaign className="text-primary" /> {campName}
        </h2>

        {/* Doctor & Participants */}
        <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <p className="flex items-center gap-1">
            <FaUserDoctor className="text-primary/70" />
            {healthcareProfessionalName}
          </p>
          <p className="flex items-center gap-1">
            <FaUsers className="text-primary/70" />
            {participantCount} joined
          </p>
        </div>

        {/* Location */}
        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
          <FaLocationDot className="text-primary" /> {location}
        </p>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
          {description.slice(0, 80)}...
        </p>
      </div>

      {/* Footer Button */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-auto">
        <Link
          to={`/camp-details/${_id}`}
          className="w-full btn bg-primary hover:bg-primary-hover text-white rounded-lg shadow-md"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default CampCard;
