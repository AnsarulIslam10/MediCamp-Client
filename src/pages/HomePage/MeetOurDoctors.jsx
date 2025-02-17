import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MeetOurDoctors = () => {
  const doctorsData = [
    {
      name: "DR. Example Name",
      specialty: "HEMATOLOGY",
      image: "https://via.placeholder.com/150",
      description:
        "This is a sample text. You simply add your own text and description here. This text is fully editable.",
    },
    {
      name: "DR. Example Name",
      specialty: "ORTHOPEDICS",
      image: "https://via.placeholder.com/150",
      description:
        "This is a sample text. You simply add your own text and description here. This text is fully editable.",
    },
    {
      name: "DR. Example Name",
      specialty: "NEUROLOGY",
      image: "https://via.placeholder.com/150",
      description:
        "This is a sample text. You simply add your own text and description here. This text is fully editable.",
    },
  ];
  return (
    <section className="my-8 lg:my-16">
      <div className="mx-auto">
        <SectionTitle title={"Meet Our Doctors"} sub={"Our Doctors"} />

        {/* 2. Map over the doctorsData to render each card */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 shadow-card-shadow dark:shadow-none p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-full border-4 border-gray-200 w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-secondary dark:text-primary">{doctor.name}</h3>
              <p className="text-sm text-gray-500 font-semibold">
                {doctor.specialty}
              </p>
              <div className="divider px-20"></div>
              <p className="text-gray-600 text-sm">{doctor.description}</p>
              <div className="flex justify-center space-x-3 mt-4">
                <a href="#">
                  <FaFacebook className="text-2xl text-primary" />
                </a>
                <a href="#">
                  <FaXTwitter className="text-2xl text-primary" />
                </a>
                <a href="#">
                  <FaYoutube className="text-2xl text-primary" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoctors;
