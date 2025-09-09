import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import {
  FaHeartbeat,
  FaAmbulance,
  FaBrain,
  FaChalkboardTeacher,
} from "react-icons/fa";

const OurServices = () => {
  return (
    <section id="services" className="my-8 lg:my-16">
      <div className="mx-auto">
        <SectionTitle title={"Our Services"} sub={"Check out our services"} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
            <div className="flex justify-center mb-4">
              <FaHeartbeat className="text-primary text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Medical Checkups
            </h3>
            <p className="text-description dark:text-gray-200 text-sm">
              Regular health screenings and consultations by certified
              professionals.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
            <div className="flex justify-center mb-4">
              <FaAmbulance className="text-primary text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Emergency Care
            </h3>
            <p className="text-description dark:text-gray-200 text-sm">
              Immediate assistance for injuries and urgent medical conditions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
            <div className="flex justify-center mb-4">
              <FaBrain className="text-primary text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Mental Health Support
            </h3>
            <p className="text-description dark:text-gray-200 text-sm">
              Counseling sessions and mental wellness programs for all ages.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
            <div className="flex justify-center mb-4">
              <FaChalkboardTeacher className="text-primary text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Health Workshops
            </h3>
            <p className="text-description dark:text-gray-200 text-sm">
              Educational sessions on nutrition, fitness, and preventive care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
