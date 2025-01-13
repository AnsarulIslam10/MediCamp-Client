import React from "react";
import useCamp from "../../hooks/useCamp";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Loading from "../../components/Shared/Loading";

const AvailableCamps = () => {
  const [camp, loading] = useCamp();

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {camp.map((item) => (
          <CampCard key={item._id} item={item}></CampCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
