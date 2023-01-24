import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* padding: 16px; */
  overflow: hidden;
  /* background-color: aliceblue; */
`;

export const Image = styled.img`
  /* height: ; */
  width: 100%;
  object-fit: cover;
`;

export const Title = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  align-items: center;
  letter-spacing: 2px;
`;

export const Price = styled.p`
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #5d697a;
`;
function Rells({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      {/* <Title>{item.title}</Title>
      <Price>{item.price}</Price> */}
    </Container>
  );
}

export default Rells;
