import React from "react";
import styled from "styled-components";
import ShoesNewArrival from "../components/ShoesNewArrival";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Clotes, Shoes } from "../data";
import ClotesNewArrival from "../components/ClotesNewArrival";
import { TurnedIn } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../useFetch";
import { useState } from "react";

export const Container = styled.div`
  display: grid;
  justify-content: center;
`;

export const SlideWrapp = styled.div`
  justify-content: center;
  /* gap: 20px; */
  padding: 0 40px;
  /* width:  */
  margin: 20px 0 20px 0;
  max-width: 100vw;
  overflow: hidden;
`;

const NewArrival = () => {
  const allProduct = useSelector((state) => state.product.products);
  // console.log(allProduct);
  const [shoes, setShoes] = useState([]);
  const [clotes, setClotes] = useState([]);

  useEffect(() => {
    const getProductWithCat = async () => {
      //limit set di api product
      const res = await fetchData.get(`/products?categories=SHOES&limit=4`);
      setShoes(res?.data);
      const cloth = await fetchData.get("/products?categories=CLOTHES");
      setClotes(cloth?.data);
    };
    getProductWithCat();
  }, [allProduct]);

  console.log(clotes);

  return (
    <Container>
      <SlideWrapp>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          //   draggable={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {shoes.map((item) => (
            <SwiperSlide key={item._id}>
              <ShoesNewArrival item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapp>
      <SlideWrapp>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          //   draggable={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {clotes.map((item) => (
            <SwiperSlide key={item._id}>
              <ShoesNewArrival item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapp>
    </Container>
  );
};

export default NewArrival;
