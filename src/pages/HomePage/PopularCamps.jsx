import React from "react";
import img from "../../assets/card demo image.png";
import {
  FaArrowRight,
  FaClock,
  FaDollarSign,
  FaLocationDot,
  FaUserDoctor,
  FaUsers,
} from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";
const PopularCamps = () => {
  return (
    <section className="my-16">
      <h1 className="text-4xl text-center mb-8 text-title font-bold">
        Popular Medical Camps
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
        {/* demo cards */}
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-card-shadow">
          <div className="relative">
            <figure>
              <img className="rounded-t-2xl" src={img} alt="camp" />
            </figure>
            <p className="absolute top-4 right-4 bg-primary text-3xl px-3 drop-shadow-md rounded-xl font-semibold flex items-center">
              <FaDollarSign />
              50
            </p>
          </div>
          <div className="card-body space-y-1">
            <div className="flex items-center justify-between text-description">
              <p className="flex items-center gap-1">
                <FaCalendarAlt /> 15-02-2025
              </p>
              <p className="flex items-center gap-1">
                <FaClock /> 10:00 AM
              </p>
            </div>

            <h2 className="card-title text-2xl flex items-center gap-1">
              <MdCampaign className="text-description" />
              Wellness Check Camp
            </h2>
            <p className="flex items-center gap-1 text-xl">
              <FaUserDoctor className="text-description" />
              Dr. Emily Carter
            </p>
            <p className="flex items-center gap-1 text-xl">
              <FaUsers className="text-description" />
              50
            </p>
            <p className="text-description flex items-center gap-1">
              <FaLocationDot className="text-xl" /> Rajshahi, Bangladesh
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to={"/available-camps"}
          className="flex items-center font-bold text-xl bg-primary hover:bg-primary-hover btn mt-4"
        >
          See All Camps <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
