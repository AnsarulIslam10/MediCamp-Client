import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import image1 from "../../assets/carousel/dental.jpg";
import image2 from "../../assets/carousel/eye-checkup.jpg";
import image3 from "../../assets/carousel/health.jpg";

const Carousel = () => {
  return (
    <div id="banner">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] w-full"
            src={image1}
          />
          <div
            className="absolute top-0 w-full text-center h-full flex flex-col justify-center items-center
           p-12 text-white bg-black bg-opacity-50"
          >
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl text-primary font-bold max-w-lg mb-2 sm:mb-4 md:mb-6">
              Smiles Restored: Dental Care for Every Child
            </h1>
            <p className="max-w-md text-center text-xs sm:text-sm text-gray-200">
              A simple dental checkup can prevent a lifetime of pain. This camp
              focused on pediatric dental health, offering free checkups and
              treatments. The joy of a child’s healthy smile became the camp's
              most rewarding success
            </p>
            <div></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] w-full"
            src={image2}
          />
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-center items-center
           p-12 text-white bg-black bg-opacity-50"
          >
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl text-primary text-center font-bold max-w-lg mb-2 sm:mb-4 md:mb-6">
              Vision Camp: Restoring Sight, Renewing Live
            </h1>
            <p className="max-w-md text-center text-xs sm:text-sm text-gray-300">
              This eye camp brought clarity to many, offering free check-ups and
              surgeries. For countless individuals, regaining their vision meant
              regaining their independence and confidence.
            </p>
            <div></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] w-full"
            src={image3}
          />
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-center items-center
           p-12 text-white bg-black bg-opacity-50"
          >
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-4xl text-primary text-center font-bold max-w-lg mb-2 sm:mb-4 md:mb-6">
              General Health Check-Up Camp
            </h1>
            <p className="max-w-md text-center text-xs sm:text-sm text-gray-300">
              This camp provided comprehensive health screenings, offering
              residents a chance to monitor their well-being with free medical
              consultations, vital check-ups, and guidance for a healthier
              lifestyle.
            </p>
            <div></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
