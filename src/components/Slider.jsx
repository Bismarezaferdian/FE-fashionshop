// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 0 40px;
  display: flex;
  /* height: 60vh; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  display: flex;
  object-fit: cover;
`;

// const Arrow = styled.div`
//   width: 50px;
//   height: 50px;
//   background-color: #fff7f7;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: ${(props) => props.direction === "left" && "10px"};
//   right: ${(props) => props.direction === "right" && "10px"};
//   margin: auto;
//   cursor: pointer;
//   opacity: 0.5;
//   z-index: 2;
// `;

// const Wrapper = styled.div`
//   /* height: 100%; */
//   /* display: flex; */
//   transition: all 1.5s ease;
//   transform: translateX(${(props) => props.slideIndex * -100}vw);
// `;

// const Slide = styled.div`
//   width: 100%;
//   max-width: 1043px;
//   /* height: 100vh; */
//   display: flex;
//   align-items: center;
//   background-color: #${(props) => props.bg};
// `;

// const ImgContainer = styled.div`
//   max-width: 1984px;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 50px;
// `;

// const Title = styled.h1`
//   font-size: 70px;
// `;

// const Desc = styled.p`
//   margin: 50px 0px;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 3px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   font-size: 20px;
//   background-color: transparent;
//   cursor: pointer;
// `;

const Slider = () => {
  // const [slideIndex, setSlideIndex] = useState(0);
  // const handleClick = (direction) => {
  //   if (direction === "left") {
  //     setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
  //   } else {
  //     setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
  //   }
  // };

  return (
    <Container>
      <Swiper
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 3000,
        // }}
        loop={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {sliderItems.map((item, i) => (
          <SwiperSlide key={i}>
            <Image src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Slider;
