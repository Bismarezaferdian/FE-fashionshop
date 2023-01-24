import React from "react";
import styled from "styled-components";
import ShoesNewArrival from "../components/ShoesNewArrival";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Clotes, Shoes } from "../data";
import ClotesNewArrival from "../components/ClotesNewArrival";
import { TurnedIn } from "@material-ui/icons";

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
          {Shoes.map((item) => (
            <SwiperSlide key={item.id}>
              <ClotesNewArrival item={item} />
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
          {Clotes.map((item) => (
            <SwiperSlide key={item.id}>
              <ShoesNewArrival item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrapp>
    </Container>
  );
};

export default NewArrival;
