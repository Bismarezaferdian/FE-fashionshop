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
  /* width: 100vw;
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  padding: 0 12px 0 12px; */
  /* display: grid; */
  /* grid-template-columns: repeat(5, 1fr); */
  justify-content: center;
  /* display: flex; */
  /* gap: 20px; */
  padding: 0 40px 0 40px;
  /* width:  */
  margin: 20px 0 20px 0;
  max-width: 100vw;
  overflow: hidden;
`;

const NewArrivalClotes = () => {
  return (
    <Container>
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

export default NewArrivalClotes;
