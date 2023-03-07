import React from "react";
import styled from "styled-components";
import ShoesNewArrival from "../components/ShoesNewArrival";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../useFetch";
import { useState } from "react";
import ClotesNewArrival from "../components/ClotesNewArrival";

export const Container = styled.div`
  display: grid;
  justify-content: center;
`;

export const SlideWrapp = styled.div`
  justify-content: center;
  /* gap: 20px; */
  padding: 0 40px;
  /* width:  */
  text-decoration: none;

  margin: 20px 0 20px 0;
  max-width: 100vw;
  overflow: hidden;
`;

const NewArrival = () => {
  // const allProduct = useSelector((state) => state.product);
  // console.log(allProduct);
  const [shoes, setShoes] = useState([]);
  const [clotes, setClotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const getProductWithCat = async () => {
      setLoading(true);
      try {
        //limit set di api product
        const res = await fetchData.get(`/products?categories=SHOES`);
        setShoes(res?.data);
        const cloth = await fetchData.get("/products?categories=CLOTHES");
        setClotes(cloth?.data);
      } catch (error) {
        // setError(error);
      }
      setLoading(false);
    };
    getProductWithCat();
  }, []);

  return (
    <Container>
      <SlideWrapp>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          // navigation={true}
          // draggable={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {shoes.map((item) => (
            <SwiperSlide key={item._id}>
              <ShoesNewArrival loading={loading} item={item} />
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
          draggable={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {clotes.map((item) => (
            <SwiperSlide key={item._id}>
              <ClotesNewArrival loading={loading} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapp>
    </Container>
  );
};

export default NewArrival;
