import React from "react";
import { FaArrowRight } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Loading from "../../components/Shared/Loading";
const PopularCamps = () => {
  const { data: popularCamps = [], isLoading } = useQuery({
    queryKey: ["popularCamp"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/popular-camps`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="my-16">
      <h1 className="text-4xl text-center mb-8 text-title font-bold">
        Popular Medical Camps
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularCamps.map((item) => (
          <CampCard key={item._id} item={item}></CampCard>
        ))}
      </div>
      <div className="flex justify-end">
        <Link
          to={"/available-camps"}
          className="flex items-center font-semibold text-xl bg-primary hover:bg-primary-hover btn mt-4"
        >
          See All Camps <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
