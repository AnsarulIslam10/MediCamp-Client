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
const FeedbackAndRatings = () => {
  return (
    <div className="my-16">
      <h1 className="text-center text-4xl font-bold mb-8">Feedback And Ratings</h1>
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
        <SwiperSlide>
          <div className="text-center flex items-center justify-center flex-col">
            <div className="avatar mb-3 p-2">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <Rating style={{ maxWidth: 150 }} value={3} readOnly />
            <p className="max-w-lg mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus labore id ab eveniet excepturi, minima obcaecati quos
              soluta repellat pariatur, deserunt expedita quae dolor ducimus,
              culpa harum a nemo deleniti aspernatur necessitatibus accusantium
              architecto maxime mollitia recusandae. Minima, illo enim fugiat
              suscipit similique recusandae, maiores ut obcaecati est id
              quisquam.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center flex items-center justify-center flex-col">
            <div className="avatar mb-3 p-2">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <Rating style={{ maxWidth: 150 }} value={3} readOnly />
            <p className="max-w-lg mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus labore id ab eveniet excepturi, minima obcaecati quos
              soluta repellat pariatur, deserunt expedita quae dolor ducimus,
              culpa harum a nemo deleniti aspernatur necessitatibus accusantium
              architecto maxime mollitia recusandae. Minima, illo enim fugiat
              suscipit similique recusandae, maiores ut obcaecati est id
              quisquam.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center flex items-center justify-center flex-col">
            <div className="avatar mb-3 p-2">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <Rating style={{ maxWidth: 150 }} value={3} readOnly />
            <p className="max-w-lg mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus labore id ab eveniet excepturi, minima obcaecati quos
              soluta repellat pariatur, deserunt expedita quae dolor ducimus,
              culpa harum a nemo deleniti aspernatur necessitatibus accusantium
              architecto maxime mollitia recusandae. Minima, illo enim fugiat
              suscipit similique recusandae, maiores ut obcaecati est id
              quisquam.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeedbackAndRatings;
