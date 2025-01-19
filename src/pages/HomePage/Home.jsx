import React from "react";
import Container from "../../components/Shared/Container";
import Carousel from "./Carousel";
import PopularCamps from "./PopularCamps";
import FeedbackAndRatings from "./FeedbackAndRatings";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <Container>
      <Carousel></Carousel>
      <PopularCamps></PopularCamps>
      <FeedbackAndRatings></FeedbackAndRatings>
      <FAQs></FAQs>
    </Container>
  );
};

export default Home;
