import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaCheck } from "react-icons/fa";

const Membership = () => {
  const tiers = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Regular health updates",
        "Access to health tips",
        "Event notifications"
      ]
    },
    {
      name: "Premium",
      price: "$10 / month",
      features: [
        "All Basic features",
        "Priority registration for medical camps",
        "Exclusive discounts on services"
      ]
    },
    {
      name: "VIP",
      price: "$25 / month",
      features: [
        "All Premium features",
        "1-on-1 health consultation priority",
        "Special gifts & loyalty perks"
      ]
    }
  ];

  return (
    <section className="py-16 dark:bg-slate-900">
      <SectionTitle
        title="Become a Member"
        sub="Choose the plan that fits you and enjoy exclusive health benefits."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-card-shadow dark:shadow-none flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold text-secondary dark:text-primary">
                {tier.name}
              </h3>
              <p className="text-3xl font-bold mt-4 text-primary">
                {tier.price}
              </p>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-description dark:text-gray-200">
                    <FaCheck className="text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 w-full py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
              Join {tier.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Membership;
