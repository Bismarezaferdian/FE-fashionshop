import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Shoes } from "../data";
import { addToProduct } from "../redux/productRedux";
import { fetchData } from "../useFetch";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const { state } = useLocation();
  console.log(state);
  const searchProduct = state;
  // console.log(searchProduct.length);
  // console.log(searchProduct);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([1]);
  const dispatch = useDispatch();
  useEffect(() => {
    // const getProduct = async () => {
    //   try {
    //     const res = await fetchData.get(
    //       cat ? `/product?categories=${cat}` : "/products"
    //     );
    //     setProducts(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getProduct();
  }, [cat]);

  useEffect(() => {
    dispatch(addToProduct([...products]));
  }, [products, dispatch]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createAt - b.createAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  // console.log(products);

  // dispatch(addToProduct([...products]));

  return (
    <Container>
      {searchProduct?.length > 0
        ? searchProduct?.map((item) => <Product item={item} key={item.id} />)
        : Shoes?.map((item) => <Product item={item} key={item.id} />)}
      {/* popularProduct di ganti dengan  product */}
    </Container>
  );
};

export default Products;
