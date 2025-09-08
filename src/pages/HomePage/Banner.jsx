import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import bannerAnim from "../../assets/animation/medical-camp.json";

const Banner = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-[50vh] sm:min-h-[50vh] flex items-center">
      <div className="w-full grid md:grid-cols-2 items-center gap-8 max-w-screen-xl mx-auto">

        {/* Left Content */}
        <Slide direction="left" triggerOnce>
          <div className="text-center md:text-left px-4 sm:px-6 lg:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary dark:text-white leading-tight">
              Join <span className="text-primary">Medical Camps</span> <br />
              Anytime, Anywhere
            </h1>

            <Fade delay={300} triggerOnce>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
                MediCamp connects you with ongoing and upcoming medical camps.
                Get health check-ups, doctor consultations, and treatments —
                all in one place.
              </p>
            </Fade>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/available-camps"
                className="inline-block rounded-lg bg-primary px-6 sm:px-8 py-3 text-white font-medium shadow-md transition-transform hover:scale-105 hover:bg-primary-dark"
              >
                Explore Camps
              </Link>

              <Link
                to="/about"
                className="inline-block rounded-lg border border-gray-300 dark:border-gray-600 px-6 sm:px-8 py-3 text-gray-800 dark:text-gray-200 font-medium shadow-sm transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Learn More
              </Link>
            </div>
          </div>
        </Slide>

        {/* Right Side Lottie/Illustration */}
        <Slide direction="right" triggerOnce>
          <div className="hidden md:block w-full max-w-lg mx-auto md:mx-0">
            <Lottie
              animationData={bannerAnim}
              loop={true}
              className="w-full h-full"
            />
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Banner;
