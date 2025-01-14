import React, { useState } from "react";
import useCamp from "../../hooks/useCamp";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Loading from "../../components/Shared/Loading";
import Container from "../../components/Shared/Container";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";

const AvailableCamps = () => {
  const [camp, loading] = useCamp();
  const [viewLayout, setViewLayout] = useState("three");
  const toggleView = () => {
    setViewLayout((prev) => (prev === "three" ? "two" : "three"));
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <div className="my-16">
        <div className="flex items-center gap-2  text-3xl justify-end mb-4">
          <button onClick={toggleView}>
            <TfiLayoutGrid2Alt
              className={`${viewLayout === "two" ? "text-primary" : ""}`}
            />
          </button>
          <button onClick={toggleView}>
            <TfiLayoutGrid3Alt
              className={`${viewLayout === "three" ? "text-primary" : ""}`}
            />
          </button>
        </div>
        {viewLayout === "three" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {camp.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {camp.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AvailableCamps;
