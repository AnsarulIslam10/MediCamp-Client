import React from "react";
import Container from "../../components/Shared/Container";
import Carousel from "./Carousel";
import PopularCamps from "./PopularCamps";
import FeedbackAndRatings from "./FeedbackAndRatings";
import FAQs from "./FAQs";
import { Helmet } from "react-helmet-async";
import OurServices from "./OurServices";
import MeetOurDoctors from "./MeetOurDoctors";
import EmergencyHelpline from "./EmergencyHelpline";
import HealthTipsAwareness from "./HealthTipsAwareness";

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>MediCamp | Home</title>
      </Helmet>
      <Carousel></Carousel>
      <PopularCamps></PopularCamps>
      <OurServices/>
      <MeetOurDoctors/>
      <HealthTipsAwareness/>
      <FeedbackAndRatings></FeedbackAndRatings>
      <EmergencyHelpline></EmergencyHelpline>
      <FAQs></FAQs>
    </Container>
  );
};

export default Home;
