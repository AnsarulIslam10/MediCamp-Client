import React from "react";

const SectionTitle = ({ title, sub }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4">
        {title}
      </h1>
      <p className="text-description italic">{sub}</p>
    </div>
  );
};

export default SectionTitle;
