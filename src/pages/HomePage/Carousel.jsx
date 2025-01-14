import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import image1 from "../../assets/carousel/Banner 1.webp";
import image2 from "../../assets/carousel/banner-2.jpg";
import image3 from "../../assets/carousel/banner 3.jpg";

const Carousel = () => {
  return (
    <>
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
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] xl:h-[40vh] w-full"
            src={image1}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] xl:h-[40vh] w-full"
            src={image2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover h-[30vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] xl:h-[40vh] w-full"
            src={image3}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
