import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";

import image1 from "../../assets/carousel/dental.jpg";
import image2 from "../../assets/carousel/eye-checkup.jpg";
import image3 from "../../assets/carousel/health.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    image: image1,
    title: "Smiles Restored: Dental Care for Every Child",
    text: "A simple dental checkup can prevent a lifetime of pain. This camp focused on pediatric dental health, offering free checkups and treatments. The joy of a child’s healthy smile became the camp's most rewarding success.",
  },
  {
    image: image2,
    title: "Vision Camp: Restoring Sight, Renewing Lives",
    text: "This eye camp brought clarity to many, offering free check-ups and surgeries. For countless individuals, regaining their vision meant regaining their independence and confidence.",
  },
  {
    image: image3,
    title: "General Health Check-Up Camp",
    text: "This camp provided comprehensive health screenings, offering residents a chance to monitor their well-being with free consultations, vital check-ups, and lifestyle guidance.",
  },
];

const Carousel = () => {
  return (
    <div id="banner" className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[EffectFade, Autoplay, Navigation]}
        className="rounded-2xl shadow-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[30vh] sm:h-[60vh] md:h-[75vh]">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <h1
                  className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg max-w-2xl 
                  transition-all duration-700 ease-in-out hover:scale-105"
                >
                  {slide.title}
                </h1>
                <p
                  className="mt-3 max-w-lg text-sm sm:text-base md:text-lg text-gray-200 transition-opacity duration-700"
                >
                  {slide.text}
                </p>

                {/* CTA Button */}
                <Link to={"/available-camps"}
                  className="mt-5 px-6 py-2 rounded-full bg-primary text-white font-semibold shadow-md 
                  hover:bg-primary/90 hover:scale-105 transition-transform duration-300"
                >
                  View Camps
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
