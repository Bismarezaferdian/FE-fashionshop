import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { SearchOutlined } from "@material-ui/icons";
// import { Skeleton } from "@material-ui/";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* padding: 16px; */
  overflow: hidden;
  text-decoration: none;
  &:hover ${Info} {
    opacity: 1;
    /* border-radius: 50%; */
  }
  /* background-color: aliceblue; */
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  cursor: pointer;
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
  color: #000000;
`;

export const Price = styled.p`
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #5d697a;
`;
function ProductNewArrival({ loading, item }) {
  return (
    <>
      {loading ? (
        <>
          <Skeleton
            // sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            animation="wave"
            width={210}
            height={118}
          />
          <Skeleton animation="wave" />
          <Skeleton width="60%" animation="wave" />
        </>
      ) : (
        <LinkTo to={`/product/${item._id}`}>
          <Container>
            <Image src={item.imgDisplay.imgUrl} />
            <Title>{item.title}</Title>
            <Price>{item.price}</Price>
            <Info>
              <Icon>
                <SearchOutlined />
              </Icon>
            </Info>
          </Container>
        </LinkTo>
      )}
    </>
  );
}

export default ProductNewArrival;
