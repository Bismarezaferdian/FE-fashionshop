import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import { addToCart } from "../redux/cartRedux";
import { mobile } from "../responsive";
import { fetchData } from "../useFetch";
import Sliders from "../components/Slider";
import { updatecart } from "../redux/apiCall";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  /* max-height: 60vh; */
  /* width: 300px;
  height: 400px; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

// const Image = styled.img`
//   width: 100%;
//   height: 90vh;
//   object-fit: cover;
//   ${mobile({ height: "40vh" })}
// `;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
  /* width: 20px;
  height: 20px; */
  /* border-radius: 50%; */

  /* background-color: ${(props) => props.color}; */
  margin-left: 10px;

  cursor: pointer;
`;

const FilterSize = styled.div`
  display: flex;
  margin-left: 10px;
  /* padding: 5px; */
  gap: 20px;
`;

const FilterOptionColor = styled.option`
  padding: 20px;
  display: flex;
  border: 1px solid #000000;
  padding: 10px;
  white-space: nowrap;
`;
const FilterOptionSize = styled.button`
  display: flex;
  border: ${(props) =>
    props.clicked ? "1px solid #000000" : "1px solid #e8e2e2"};
  padding: 10px;
  color: ${(props) => (props.clicked ? "#000000" : "#afb9c8")};
  background-color: ${(props) => (props.clicked ? "#d6e4e5" : " #ffffff")};
  white-space: nowrap;
  cursor: pointer;

  /* &.active {
    color: 
    background-color: #d6e4e5;
  } */
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [size, setSize] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [errorColor, setErrorColor] = useState(false);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProducts());
    const getProductItem = async () => {
      try {
        const res = await fetchData.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        // setError(error);
        console.log(error);
      }
    };
    getProductItem();
  }, [id]);

  const handleQty = (type) => {
    if (type === "desc") {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (type === "asc") {
      setQuantity(quantity + 1);
    }
  };

  const { desc, imgDetail, categories, ...productChart } = product;
  const products = { ...productChart, size, color, quantity };

  // console.log(products);
  //
  const handleClick = (item) => {
    //membuat object baru
    const newClicked = { ...clicked };
    Object.keys(newClicked).forEach((key) => {
      //jika key tidak sama dengan item set semua ke false
      //kondisi 1
      //misal m= false saat di klik selain m false semua (m masih false)
      //kondisi 2
      //misal m = true saal di klik selain m false semua (m masih true)
      if (key !== item) newClicked[key] = false;
    });
    //kondisi 1
    //m false di isi dengan true
    //kondisi 2
    //m true di isi dengan false
    newClicked[item] = !newClicked[item];
    setClicked(newClicked);
  };

  const validate = () => {
    if (size === undefined) setErrorSize(true);
    if (color === undefined) setErrorColor(true);
  };

  useEffect(() => {
    if (size) setErrorSize(false);
    if (color) setErrorColor(false);
  }, [size, color]);

  // console.log(productChart);
  const handleAddToChart = () => {
    // const inCart = cart.find(
    //   (cart) =>
    //     cart._id === product._id &&
    //     cart.color === products.color &&
    //     cart.size === products.size
    // );
    if (!size || !color) {
      validate();
    } else if (userId) {
      updatecart(userId, { products: products }, dispatch);
      dispatch(addToCart({ userId, products: products }));
    } else {
      alert("silahkan login dahulu");
      navigate("/login");
    }
  };
  return (
    <Container>
      <Navbar />x
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {product.imgDetail?.map((item, i) => (
              <SwiperSlide key={i}>
                <Sliders item={item.imgUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((colors, i) => (
                <FilterColor key={i} onClick={(e) => setColor(e.target.value)}>
                  <FilterOptionColor>{colors}</FilterOptionColor>
                </FilterColor>
              ))}
            </Filter>
            {errorColor ? (
              <span style={{ color: "red " }}>silahkan pilih warna</span>
            ) : null}
            <Filter>
              <FilterTitle>Size</FilterTitle>
              {product.size?.map((item, i) => (
                <FilterSize key={i} onClick={(e) => setSize(e.target.value)}>
                  <FilterOptionSize
                    // key={item}
                    clicked={clicked[item]}
                    onClick={() => handleClick(item)}
                    value={item}
                  >
                    {item}
                  </FilterOptionSize>
                </FilterSize>
              ))}
            </Filter>
            <Price>stock {product.stock}</Price>
            {errorSize ? (
              <span style={{ color: "red " }}>silahkan pilih ukuran</span>
            ) : null}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQty("desc")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQty("asc")} />
            </AmountContainer>
            <Button onClick={handleAddToChart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
