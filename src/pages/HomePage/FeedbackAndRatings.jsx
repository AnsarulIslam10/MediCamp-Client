import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const FeedbackAndRatings = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedback } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });
  console.log(feedback);
  return (
    <div className="my-16">
      <h1 className="text-center text-4xl font-bold mb-8">
        Feedback And Ratings
      </h1>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {feedback?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="text-center flex items-center justify-center flex-col">
              <div className="avatar flex-col mb-3 p-2">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                  <img src={item.photo} />
                </div>
              <h2 className="mt-2 font-semibold">{item.name}</h2>
              </div>
              <h2 className="text-xl font-semibold">{item.campName}</h2>
              <Rating style={{ maxWidth: 120 }} value={item.rating} readOnly />
              <p className="max-w-lg mt-3">{item.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackAndRatings;
