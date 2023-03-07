import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Rells from "../components/Rells";
import { Link } from "react-router-dom";
import { fetchData } from "../useFetch";

export const Container = styled.div`
  display: grid;
  justify-content: center;
`;

export const WrappTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 60px;
`;
export const HeaderTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`;
export const LinkTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  /* list-style: none; */
  color: blue;
`;

export const Title = styled.p`
  padding-left: 60px;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 24px;
  margin-top: 20px;
  /* padding-bottom: 28px; */
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const SlideWrapp = styled.div`
  justify-content: center;
  padding: 0 40px 0 40px;
  margin: 20px 0 20px 0;
  max-width: 100vw;
  overflow: hidden;
`;

const RellsProducts = () => {
  const [productMore, setProductMore] = useState([]);

  useEffect(() => {
    const getproduct = async () => {
      const res = await fetchData.get("/products?new=true&limit=10");
      setProductMore(res.data);
    };
    return getproduct();
  }, []);

  return (
    <Container>
      <WrappTitle>
        <HeaderTitle>Explore More</HeaderTitle>
        <LinkTitle to={"/products"}>View All</LinkTitle>
      </WrappTitle>
      <SlideWrapp>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          loop={false}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {productMore.map((item, i) => (
            <SwiperSlide key={i}>
              <Rells item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapp>
    </Container>
  );
};

export default RellsProducts;
