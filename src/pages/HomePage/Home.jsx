import React from 'react';
import Container from '../../components/Shared/Container';
import Carousel from './Carousel';
import PopularCamps from './PopularCamps';
import FeedbackAndRatings from './FeedbackAndRatings';

const Home = () => {
    return (
        <Container>
            <Carousel></Carousel>
            <PopularCamps></PopularCamps>
            <FeedbackAndRatings></FeedbackAndRatings>
        </Container>
    );
};

export default Home;