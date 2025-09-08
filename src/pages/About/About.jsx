import { Fade, Slide } from "react-awesome-reveal";
import { FaMoneyCheckAlt, FaSearch } from "react-icons/fa";
import { FaChartLine, FaRegStar, FaUserPlus } from "react-icons/fa6";
import { GiMedicalPack } from "react-icons/gi";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const About = () => {
  return (
    <section className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">

        {/* Hero Section */}
        <Slide direction="up" triggerOnce>
          <SectionTitle
            title="About MediCamp"
            sub="MediCamp is a Medical Camp Management System (MCMS) platform connecting participants and organizers to medical camps efficiently and securely."
          />
        </Slide>

        {/* Features Section */}
        <Fade delay={200} triggerOnce>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              { icon: FaSearch, title: "Search Camps", desc: "Easily search for camps by name, date, time, healthcare professional, and location." },
              { icon: FaUserPlus, title: "Join Camps", desc: "Register for camps by filling out a simple form on the camp details page." },
              { icon: FaMoneyCheckAlt, title: "Payment Integration", desc: "Secure payments via Stripe for camp registration fees." },
              { icon: FaChartLine, title: "Analytics", desc: "Track your participation, payments, and personal statistics easily." },
              { icon: FaRegStar, title: "Ratings & Feedback", desc: "Rate and leave feedback for camps you’ve attended." },
              { icon: GiMedicalPack, title: "Organizer Tools", desc: "Organizers can post, manage camps and participants, and track payments." }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white dark:bg-slate-900 p-6 rounded-lg shadow-card-shadow dark:shadow-none hover:shadow-lg transition">
                <div className="bg-primary p-4 rounded-full mb-4">
                  <item.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">{item.title}</h3>
                <p className="text-description dark:text-gray-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </Fade>

        {/* Tech Stack Section */}
        <Slide direction="up" triggerOnce>
          <div className="mt-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Tech Stack
            </h2>
            <p className="text-description dark:text-gray-200 max-w-3xl mx-auto mb-6">
              MediCamp is built with modern web technologies to ensure performance, scalability, and security.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Stripe API"].map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-primary text-white rounded-full shadow-sm">{tech}</span>
              ))}
            </div>
          </div>
        </Slide>

        {/* Mission Section */}
        <Fade delay={200} triggerOnce>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-card-shadow dark:shadow-none p-8 mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-primary">Our Mission</h2>
            <p className="text-description dark:text-gray-200 max-w-3xl mx-auto">
              MediCamp aims to make healthcare accessible by connecting participants to medical camps effortlessly, providing organizers with efficient tools to manage camps, and enabling a smooth and secure experience for all users.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default About;
