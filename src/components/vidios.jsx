import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { banner, vidio } from "../data";

export const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  /* height: 50vh; */
  /* background: red; */
  /* grid-template-columns: repeat(2, 1fr); */
`;

export const VidioWrapp = styled.div`
  display: grid;
  padding: 40px;
  /* justify-content: end; */
  grid-column-start: 1;
  /* margin-top: 40px; */
  grid-column-end: 3;
`;

export const PosterWrapp = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 660px;
`;

export const VidCov = styled.div`
  display: grid;
  justify-content: end;
  overflow: hidden;
  grid-row-start: 1;
  grid-row-end: 3;
  object-fit: cover;
`;
export const ImgCov = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const ImgCov2 = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Img = styled.img`
  height: 100%;
  height: 330px;
  object-fit: cover;
`;
export const ContentWrapp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;
export const HeadTitle = styled.p`
  font-size: 26px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

export const DateSection = styled.div`
  display: flex;
  padding: 20px 0;
`;
export const DateCard = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 10px;
  margin-right: 20px;
  gap: 12px;
  @media screen and (max-width: 650px) {
    height: 120px;
    width: 120px;
  }
  @media screen and (max-width: 650px) {
    height: 60px;
    width: 60px;
    margin: 0 8px;
  }
`;
export const TimeWrapp = styled.div`
  font-size: 24px;
  @media screen and (max-width: 650px) {
    font-size: 18px;
  }
  @media screen and (max-width: 650px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;
export const CardDesc = styled.p`
  font-weight: 500; /* font-family: "Shadows Into Light", cursive; */
`;

function Vidios() {
  const [timeDays, setTimedays] = useState("00");
  const [timeHours, setTimeHours] = useState("00");
  const [timeMinutes, setTimeMinutes] = useState("00");
  const [timeSeconds, setTimeSeconds] = useState("00");

  let interval = useRef();

  const startTime = () => {
    const countdowndate = new Date("oct 03,2023 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdowndate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //clear interval
        clearInterval(interval.current);
      } else {
        setTimedays(days);
        setTimeHours(hours);
        setTimeMinutes(minutes);
        setTimeSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Container>
      <VidioWrapp>
        {/* {banner.map((item, i) => ( */}
        {/* <div key={i}> */}
        <PosterWrapp>
          <VidCov>
            <video height="660" controls>
              <source src={banner[0].img} />
            </video>
          </VidCov>
          <ImgCov>
            <Img src={banner[1].img} alt="" />
          </ImgCov>
          <ImgCov2>
            {" "}
            <Img src={banner[2].img} alt="" />
          </ImgCov2>
        </PosterWrapp>
        {/* </div>
        ))} */}
      </VidioWrapp>
      <ContentWrapp>
        <HeadTitle>Nike Air Max</HeadTitle>
        <Title> launching at 20 november 2023</Title>
        {/* time */}
        <DateSection id="DateTime">
          {/* <DateWrapp> */}
          {/* <CardWrapp> */}
          <DateCard>
            <TimeWrapp>{timeDays}</TimeWrapp>

            <CardDesc>Days</CardDesc>
          </DateCard>
          <DateCard>
            <TimeWrapp>{timeHours}</TimeWrapp>
            <CardDesc>Hours</CardDesc>
          </DateCard>
          <DateCard>
            <TimeWrapp>{timeMinutes}</TimeWrapp>
            <CardDesc>Minute</CardDesc>
          </DateCard>
          <DateCard>
            <TimeWrapp>{timeSeconds}</TimeWrapp>
            <CardDesc>Second</CardDesc>
          </DateCard>
          {/* </CardWrapp> */}
          {/* </DateWrapp> */}
        </DateSection>
      </ContentWrapp>
    </Container>
  );
}

export default Vidios;
