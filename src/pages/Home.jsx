import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
// import Products from "../components/Products";
// import Slider from "../components/Slider";
import Vidios from "../components/Vidios";
import Banner from "./Banner";
import NewArrival from "./NewArrival";
import RellsProducts from "./RellsProducts";
// import NewArrivalShoes from "./RellsProducts";

export const Countainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
`;

export const Title = styled.p`
  font-size: 24px;
  display: grid;
  margin-left: 40px;
  font-weight: 600;
`;

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Banner />
      <Title>New Arrival</Title>
      <NewArrival />
      <Categories />
      <Vidios />
      <RellsProducts />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
