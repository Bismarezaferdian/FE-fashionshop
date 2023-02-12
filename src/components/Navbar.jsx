import { Badge } from "@material-ui/core";
import {
  AccountCircleRounded,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { revertAll } from "../redux/action";
import { mobile, tablet } from "../responsive";

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 999;
  /* height: 80px; */
  background: #3330e4;
  display: flex;
  align-items: center;
  ${mobile({ height: "50px" })}/* justify-content: space-between; */
`;

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  width: 100%;
  overflow: hidden;
  ${mobile({ padding: "10px 0px" })}/* align-items: center; */
  /* justify-content: space-between; */
`;

const ShoppingCart = styled(ShoppingCartOutlined)`
  color: #ffff;
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
  outline: none;
  padding: 5px;
  margin-right: 5px;
  box-shadow: none;
  &:active {
    outline: none;
    box-shadow: none;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  height: 100%;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
`;

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
  /* margin-top: 20px; */
  /* color:  #000000; */

  ${mobile({ fontSize: "24px" })}
`;

const NavWrapLink = styled.div`
  display: flex;
  align-items: end;
  margin-top: 10px;
  justify-content: space-between;
  ${tablet({ display: "none" })}
`;

const NavLink = styled.p`
  color: #ffffff;
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
  const qty = useSelector((state) => state.cart.qty);
  const allProduct = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setProductfilters(
      allProduct.filter((item) =>
        item.title.toLowerCase().includes(sortProduct)
      )
    );
  }, [sortProduct, allProduct]);

  const handleClick = (e) => {
    // console.log(productFilters);
    e.preventDefault();
    navigate("/products", { state: productFilters });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(revertAll());
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
              style={{ color: "white", fontSize: 16 }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo to={"/"}>
            <h1>SNEAKERS</h1>
          </Logo>
          <NavWrapLink>
            <NavLink>New Arrival</NavLink>
            <NavLink>Mens</NavLink>
            <NavLink>Womens</NavLink>
            <NavLink>Brands</NavLink>
            <NavLink>Shoes</NavLink>
          </NavWrapLink>
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
          <button onClick={handleLogout}>logout</button>

          <MenuItem>
            <Link to={"/cart"}>
              <Badge badgeContent={qty} color="error">
                <ShoppingCart />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
