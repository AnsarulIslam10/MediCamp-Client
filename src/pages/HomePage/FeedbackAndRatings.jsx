import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
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

  return (
    <div id="feedback-ratings" className="my-12 lg:my-20 px-4">
      <SectionTitle
        title={"Feedback & Ratings"}
        sub={"Voices of Our Happy Participants"}
      />

      <Swiper
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {feedback?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/90 dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6 transition-transform hover:scale-[1.01]">
                {/* Left Side: Avatar */}
                <div className="flex-shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-primary shadow-md"
                  />
                </div>

                {/* Right Side: Text */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.campName}
                  </p>
                  <Rating style={{ maxWidth: 120 }} value={item.rating} readOnly />
                  <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    “{item.feedback}”
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackAndRatings;
