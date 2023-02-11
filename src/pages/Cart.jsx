import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { deleteProductCart, getCart, updatecart } from "../redux/apiCall";
import {
  addQty,
  addToCart,
  minQty,
  removeChart,
  removeQty,
} from "../redux/cartRedux";
import { mobile } from "../responsive";
import { fetchData } from "../useFetch";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid black;
  margin: 20px;
  /* justify-content: space-between; */

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  padding: 10px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Btn = styled.button`
  background-color: red;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: #404b69;
  ${mobile({ marginBottom: "20px" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: #f7f7f7;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  color: #3330e4;
  opacity: 0.8;
`;

const Button = styled.button`
  width: 100%;
  /* padding: 10px; */
  background-color: #3330e4;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  /* color: white;
  */
`;

const Cart = () => {
  // const [idProduct, setIdProduct] = useState(null);
  const cart = useSelector((state) => state.cart);
  const { _id } = useSelector((state) => state.user.currentUser);
  const userId = _id;
  const dispatch = useDispatch();

  //version chat gpt
  // const [quantityUpdates, setQuantityUpdates] = useState({});

  // console.log(quantityUpdates);
  // useEffect(() => {
  //   getCart(userId, dispatch);
  // }, [userId, dispatch]);

  // useEffect(() => {
  //   if (Object.keys(quantityUpdates).length) {
  //     const update = {};
  //     Object.entries(quantityUpdates).forEach(([id, qty]) => {
  //       update[id] = qty;
  //     });
  //     updatecart(userId, {
  //       products: update,
  //     });
  //     setQuantityUpdates({});
  //   }
  // }, [quantityUpdates, userId]);

  // const handleQty = (item, action) => {
  //   setQuantityUpdates((prevState) => {
  //     const updates = { ...prevState };
  //     if (action === "plus") {
  //       updates[item._id] = (updates[item._id] || 0) + 1;
  //       dispatch(addQty(item));
  //     } else if (action === "minus") {
  //       updates[item._id] = (updates[item._id] || 0) - 1;
  //       dispatch(removeQty(item));
  //     }
  //     return updates;
  //   });
  // };

  ///

  useEffect(() => {
    getCart(userId, dispatch);
  }, [userId, dispatch]);

  // const debouncedHandleQty = useCallback(
  //   debounce((item, action) => {
  //     if (action === "plus") {
  //       updatecart(userId, {
  //         products: item,
  //       });
  //       dispatch(addQty(item));
  //     } else if (action === "minus") {
  //       deleteProductCart(userId, {
  //         products: item,
  //       });
  //       dispatch(removeQty(item));
  //     }
  //   }, 500),
  //   []
  // );

  const handleQty = async (item, action) => {
    if (action === "plus") {
      await updatecart(userId, {
        products: item,
      });
      dispatch(addQty(item));
    } else if (action === "minus") {
      await deleteProductCart(userId, {
        products: item,
      });
      dispatch(removeQty(item));
    }
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item, i) => (
              <Product>
                <ProductDetail>
                  <Image src={item.imgDisplay} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColor color="black" />
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Btn id="plus" onClick={() => handleQty(item, "plus")}>
                      <Add />
                    </Btn>
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Btn onClick={() => handleQty(item, "minus")}>
                      {item.quantity === 1 ? "delete" : <Remove />}
                    </Btn>
                  </ProductAmountContainer>
                  <ProductPrice>{item.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rp.{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
