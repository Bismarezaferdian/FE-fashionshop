import { Badge } from "@material-ui/core";
import {
  AccountBalanceRounded,
  AccountCircleOutlined,
  AccountCircleRounded,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  background: #3330E4;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
  /* color:  black; */

  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const UserIcon = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconUser = styled(AccountCircleRounded)`
  color: #ffffff;
`;

export const Name = styled.h1`
  font-size: 18px;
  color: #ffffff;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: #000000;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [sortProduct, setSortProduct] = useState("");
  const [productFilters, setProductfilters] = useState([]);
  const navigate = useNavigate();

  const qty = useSelector((state) => state.cart.quantity);
  const allProduct = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.currentUser);
  // console.log(allProduct);
  console.log(user);
  useEffect(() => {
    setProductfilters(
      allProduct.filter((item) =>
        item.title.toLowerCase().includes(sortProduct)
      )
    );
  }, [sortProduct, allProduct]);

  const handleClick = (e) => {
    e.preventDefault();
    // dispatch(addToFilter(productFilters));
    navigate("/products", { state: productFilters });
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              onChange={(e) => setSortProduct(e.target.value.toLowerCase())}
            />
            <Search
              onClick={handleClick}
              style={{ color: "gray", fontSize: 16 }}
            />
          </SearchContainer>
        </Left>
        <Center>
          {/* <Link to={"/"}> */}
          <Logo to={"/"}>
            <h1>SNEAKERS</h1>
          </Logo>
          {/* </Link> */}
        </Center>

        <Right>
          {user ? (
            <div>
              <UserIcon>
                <IconUser />
                <Name>{user.firstname}</Name>
              </UserIcon>
            </div>
          ) : (
            <>
              <MenuItem>REGISTER</MenuItem>
              <Link to={"/login"}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <MenuItem>
            <Link to={"/cart"}>
              <Badge badgeContent={qty} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
