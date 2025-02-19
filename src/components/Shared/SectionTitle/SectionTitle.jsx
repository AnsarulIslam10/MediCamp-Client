import React from "react";

const SectionTitle = ({ title, sub = "" }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-description dark:text-gray-200 italic">{sub}</p>
    </div>
  );
};

export default SectionTitle;
