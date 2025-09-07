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
    campName,
    image,
    campFees,
    dateTime,
    location,
    healthcareProfessionalName,
    participantCount,
    description,
  } = camp;

  const formatedDate = moment(dateTime).format("LL");
  const formatedTime = moment(dateTime).format("LT");

  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <Helmet>
        <title>MediCamp | Camp Details</title>
      </Helmet>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image */}
          <div>
            <img
              src={image}
              alt={campName}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-4xl font-bold text-secondary dark:text-primary leading-snug">
                {campName}
              </h2>

              <div className="grid grid-cols-1 gap-3 text-lg">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span className="font-medium">{formatedDate}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span className="font-medium">{formatedTime}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaLocationDot className="text-primary" />
                  <span className="font-medium">{location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaDollarSign className="text-green-600 text-xl" />
                  <span className="font-semibold">
                    ${campFees}
                    <span className="text-description dark:text-gray-300 font-normal">
                      /per person
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FaUserDoctor className="text-primary" />
                  <span className="font-medium">{healthcareProfessionalName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-primary" />
                  <span className="font-medium">{participantCount} Participants</span>
                </p>
              </div>
            </div>

            {/* Join Button */}
            <div className="mt-6 flex justify-end">
              <JoinCampModal camp={camp} refetch={refetch}></JoinCampModal>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t dark:border-gray-700"></div>

        {/* Description */}
        <div className="p-6 md:p-10">
          <h3 className="text-2xl font-semibold mb-4">About This Camp</h3>
          <p className="text-lg text-description dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampDetails;
