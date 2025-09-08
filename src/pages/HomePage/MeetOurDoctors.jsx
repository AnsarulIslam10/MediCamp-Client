import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MeetOurDoctors = () => {
  const doctorsData = [
    {
      name: "DR. John Smith",
      specialty: "HEMATOLOGY",
      image: "https://i.ibb.co.com/tpCW8PL2/doctor1.jpg",
      description:
        "Dr. John Smith specializes in hematology, diagnosing and treating blood disorders such as anemia, leukemia, and clotting conditions. With years of experience, he provides expert care to improve patients' overall health.",
    },
    {
      name: "DR. Mike",
      specialty: "ORTHOPEDICS",
      image: "https://i.ibb.co.com/fV21s97n/doctor2.jpg",
      description:
        "Dr. Mike is an orthopedic specialist, focusing on musculoskeletal injuries, joint disorders, and bone health. He is dedicated to helping patients regain mobility and live pain-free lives.",
    },
    {
      name: "DR. Emily Carter",
      specialty: "NEUROLOGY",
      image: "https://i.ibb.co.com/Wv4mWgMw/doctor3.jpg",
      description:
        "Dr. Emily Carter specializes in neurology, diagnosing and treating conditions affecting the brain, spinal cord, and nerves. From migraines to complex neurological disorders, she provides compassionate and advanced care.",
    },
  ];

  return (
    <section id="doctors" className="my-8 lg:my-16">
      <div className="mx-auto">
        <SectionTitle title={"Meet Our Doctors"} sub={"Get to know the experts dedicated to your health and well-being"} />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 shadow-card-shadow dark:shadow-none p-6 text-center flex flex-col"
            >
              <div className="w-40 h-40 mx-auto mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-full border-4 border-gray-200 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-secondary dark:text-primary">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold">
                  {doctor.specialty}
                </p>
                <div className="divider px-20"></div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{doctor.description}</p>
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <a href="https://www.facebook.com" target="_blank">
                  <FaFacebook className="text-2xl text-primary" />
                </a>
                <a href="https://x.com/home" target="_blank">
                  <FaXTwitter className="text-2xl text-primary" />
                </a>
                <a href="https://www.youtube.com" target="_blank">
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
