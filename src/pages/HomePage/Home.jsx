import React from 'react';
import Container from '../../components/Shared/Container';
import Carousel from './Carousel';
import PopularCamps from './PopularCamps';

const Home = () => {
    return (
        <Container>
            <Carousel></Carousel>
            <PopularCamps></PopularCamps>
        </Container>
    );
};

export default Home;