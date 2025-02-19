import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaAmbulance, FaPhoneAlt } from "react-icons/fa";
import { FaUserDoctor, FaEnvelope } from "react-icons/fa6";

const EmergencyHelpline = () => {
  return (
    <section className="py-16 mt-0 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto text-center">
        <SectionTitle
          title={"Emergency Contact & Helpline"}
          sub={"We're available 24/7 to assist you in any medical emergency."}
        />
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
          <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full md:w-1/3">
            <div className="bg-primary p-4 rounded-full mb-4">
              <FaAmbulance className="text-4xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Ambulance Service
            </h3>
            <p className="text-description dark:text-gray-200 mb-4">Immediate medical assistance</p>
            <a
              href="tel:+88017391212121"
              className="flex items-center justify-center bg-primary text-secondary px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              <FaPhoneAlt className="mr-2" />
              017391212121
            </a>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full md:w-1/3">
            <div className="bg-secondary p-4 rounded-full mb-4">
              <FaUserDoctor className="text-4xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
              Doctor Assistance
            </h3>
            <p className="text-description dark:text-gray-200 mb-4">Contact our medical team</p>
            <a
              href="mailto:help@medicamp.com"
              className="flex items-center justify-center bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-300"
            >
              <FaEnvelope className="mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyHelpline;
