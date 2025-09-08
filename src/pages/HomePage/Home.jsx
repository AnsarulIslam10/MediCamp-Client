import { Helmet } from "react-helmet-async";
import Container from "../../components/Shared/Container";
import Blog from "./Blog";
import Carousel from "./Carousel";
import EmergencyHelpline from "./EmergencyHelpline";
import FAQs from "./FAQs";
import FeedbackAndRatings from "./FeedbackAndRatings";
import Gallery from "./Gallery";
import HealthTipsAwareness from "./HealthTipsAwareness";
import MeetOurDoctors from "./MeetOurDoctors";
import OurServices from "./OurServices";
import PopularCamps from "./PopularCamps";
import Membership from "./Membership";

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>MediCamp | Home</title>
      </Helmet>
      <Carousel></Carousel>
      <PopularCamps></PopularCamps>
      <OurServices />
      <MeetOurDoctors />
      <HealthTipsAwareness />
      <FeedbackAndRatings></FeedbackAndRatings>
      <Blog />
      <Gallery />
      <Membership />
      <EmergencyHelpline></EmergencyHelpline>
      <FAQs></FAQs>
    </Container>
  );
};

export default Home;
