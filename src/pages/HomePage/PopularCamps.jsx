import React from "react";
import { FaArrowRight } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Loading from "../../components/Shared/Loading";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
const PopularCamps = () => {
  const { data: popularCamps = [], isLoading } = useQuery({
    queryKey: ["popularCamp"],
    queryFn: async () => {
      const res = await axios.get(
        `https://medi-camp-server-opal.vercel.app/popular-camps`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section id="popular-camps" className="my-16">
      <SectionTitle
        title={"Popular Medical Camps"}
        sub={"Top Medical Camps with the Highest Participation"}
      ></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {popularCamps.map((item) => (
          <Fade key={item._id}>
            <CampCard item={item}></CampCard>
          </Fade>
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
