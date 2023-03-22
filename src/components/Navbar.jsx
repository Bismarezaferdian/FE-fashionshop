import { Badge } from "@material-ui/core";
import {
  AccountCircleRounded,
  ArrowRight,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import {
//   Avatar,
//   Box,
//   Divider,
//   Icon,
//   IconButton,
//   ListItemIcon,
//   Menu,
//   Tooltip,
// } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { revertAll } from "../redux/action";
import { mobile, tablet } from "../responsive";
import { logout } from "../redux/userRedux";

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 999;
  /* height: 80px; */
  background: #3330e4;
  display: flex;
  padding: 10px;
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

const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: #000000;
  :nth-child(1) {
    color: white;
    text-decoration: none;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// export const Icon = styled(MdLogout)`
//   font-size: 22px;
// `;

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
    navigate("/products", { state: { productFilters, sortProduct } });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(revertAll());
    dispatch(logout());
    navigate("/login");
  };

  ///

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleModal = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleModal}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      "bisma"
                      {/* <UserName>{name}</UserName> */}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem disabled>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem disabled>
                  <Avatar /> My account
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ArrowRight />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <MenuItems>REGISTER</MenuItems>
              <Link to={"/login"}>
                <MenuItems>SIGN IN</MenuItems>
              </Link>
            </>
          )}
          {/* <button onClick={handleLogout}>logout</button> */}

          <MenuItems>
            <Link to={"/cart"}>
              <Badge badgeContent={qty} color="error">
                <ShoppingCart />
              </Badge>
            </Link>
          </MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
