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
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
const FeedbackAndRatings = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedback } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });

  return (
    <div
      id="feedback-ratings"
      className="my-8 lg:my-16"
      style={{
        backgroundImage: `url(https://i.ibb.co.com/mR93Wpm/Banner-1.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/30 py-8 lg:py-16 mb-0">
        <SectionTitle
          title={"Feedback & Ratings"}
          sub={"What Our Participants Are Saying"}
        ></SectionTitle>
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
              <div className="text-center text-white flex items-center justify-center flex-col">
                <div className="avatar p-2 pb-0">
                  <div className="ring-primary ring-offset-base-100 w-12 sm:w-16 rounded-full ring ring-offset-2">
                    <img referrerPolicy="no-referrer" src={item.photo} />
                  </div>
                </div>
                <h2 className="mt-2 font-semibold">{item.name}</h2>
                <h2 className="text-xl font-semibold">{item.campName}</h2>
                <Rating
                  style={{ maxWidth: 100 }}
                  value={item.rating}
                  readOnly
                />
                <p className="max-w-xs sm:max-w-md md:max-w-lg text-xs mt-3 px-10 sm:px-0">
                  {item.feedback}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeedbackAndRatings;
