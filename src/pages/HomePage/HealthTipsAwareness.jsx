import React from "react";
import { FaBed, FaDumbbell, FaHeart, FaRegSmile } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const HealthTipsAwareness = () => {
  return (
    <section className="py-16">
      <SectionTitle
        title={"Health Tips & Awareness"}
        sub={
          "Explore our expert advice to maintain a balanced and active lifestyle."
        }
      ></SectionTitle>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-4 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-card-shadow dark:shadow-none">
            <div className="flex-shrink-0 bg-primary p-4 rounded-full">
              <MdWaterDrop className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-secondary dark:text-primary">
                Featured Tip: Stay Hydrated
              </h3>
              <p className="text-description dark:text-gray-200 mt-2">
                Drinking at least 8 glasses of water a day helps maintain your
                body’s equilibrium and improves overall energy. Hydration is key
                to a healthy life! Additionally, staying hydrated supports
                digestion, detoxification, and keeps your skin healthy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-card-shadow dark:shadow-none mt-6">
            <div className="flex-shrink-0 bg-primary p-4 rounded-full">
              <FaRegSmile className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-secondary dark:text-primary">
                Featured Tip: Take Short Breaks
              </h3>
              <p className="text-description dark:text-gray-200 mt-2">
                Taking regular short breaks throughout the day can help improve
                focus and reduce stress. Step away from your tasks, stretch, or
                enjoy a moment of quiet reflection to recharge your mind. These
                breaks enhance productivity and prevent burnout, keeping you
                refreshed and motivated.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary p-3 rounded-full">
              <FaDumbbell className="text-3xl text-white" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-secondary dark:text-primary">
                Regular Exercise
              </h4>
              <p className="text-description dark:text-gray-200">
                Engage in moderate exercise daily to strengthen your heart,
                build endurance, and improve overall well-being.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary p-3 rounded-full">
              <FaBowlFood className="text-3xl text-white" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-secondary dark:text-primary">
                Balanced Diet
              </h4>
              <p className="text-description dark:text-gray-200">
                Fuel your body with a variety of fruits, vegetables, lean
                proteins, and whole grains to keep your energy levels high.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary p-3 rounded-full">
              <FaHeart className="text-3xl text-white" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-secondary dark:text-primary">
                Mental Wellness
              </h4>
              <p className="text-description dark:text-gray-200">
                Practice mindfulness and relaxation techniques to reduce stress
                and improve your mental health.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary p-3 rounded-full">
              <FaBed className="text-3xl text-white" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-secondary dark:text-primary">
                Sleep Well
              </h4>
              <p className="text-description dark:text-gray-200">
                Aim for 7-9 hours of quality sleep each night to allow your body
                to recover and recharge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTipsAwareness;
