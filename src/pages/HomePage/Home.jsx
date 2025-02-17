import React from "react";
import Container from "../../components/Shared/Container";
import Carousel from "./Carousel";
import PopularCamps from "./PopularCamps";
import FeedbackAndRatings from "./FeedbackAndRatings";
import FAQs from "./FAQs";
import { Helmet } from "react-helmet-async";
import OurServices from "./OurServices";
import MeetOurDoctors from "./MeetOurDoctors";

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
      <FeedbackAndRatings></FeedbackAndRatings>
      <FAQs></FAQs>
    </Container>
  );
};

export default Home;
