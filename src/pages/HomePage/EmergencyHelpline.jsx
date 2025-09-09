import React, { useState } from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaAmbulance, FaPhoneAlt } from "react-icons/fa";
import { FaUserDoctor, FaEnvelope } from "react-icons/fa6";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable Card Component
const ContactCard = ({ icon, title, desc, action, href, bgColor }) => (
  <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full h-full">
    <div className={`${bgColor} p-4 rounded-full mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
      {title}
    </h3>
    <p className="text-description dark:text-gray-300 mb-4 text-center">
      {desc}
    </p>
    <a
      href={href}
      aria-label={title}
      className={`flex items-center justify-center ${bgColor} text-white px-6 py-2 rounded-lg hover:opacity-90 transition w-full`}
    >
      {action.icon}
      <span className="ml-2">{action.label}</span>
    </a>
  </div>
);

const EmergencyHelpline = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake submission simulation
    setTimeout(() => {
      setLoading(false);
      toast.success("✅ Your message has been sent successfully!");
      e.target.reset()
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 w-full rounded-xl px-2">
      <div className="mx-auto max-w-7xl w-full">
        <SectionTitle
          title="Emergency Contact & Helpline"
          sub="We're available 24/7 to assist you in any medical emergency."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 w-full">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-md w-full h-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Write your message..."
                  className="mt-1 w-full px-4 py-2 border rounded-lg dark:bg-gray-800 h-44 dark:border-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin text-2xl" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Cards */}
          <div className="flex flex-col gap-8 w-full h-full">
            <ContactCard
              icon={<FaAmbulance className="text-4xl text-white" />}
              title="Ambulance Service"
              desc="Quick emergency medical response at your doorstep."
              href="tel:+88017391212121"
              bgColor="bg-secondary"
              action={{
                icon: <FaPhoneAlt />,
                label: "017391212121",
              }}
            />
            <ContactCard
              icon={<FaUserDoctor className="text-4xl text-white" />}
              title="Doctor Assistance"
              desc="Connect with our experienced medical team instantly."
              href="mailto:help@medicamp.com"
              bgColor="bg-secondary"
              action={{
                icon: <FaEnvelope />,
                label: "Email Us",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyHelpline;
