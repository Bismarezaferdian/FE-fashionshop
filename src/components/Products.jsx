import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Shoes } from "../data";
import { getProducts } from "../redux/apiCall";
import { addToProduct, getProductFailure } from "../redux/productRedux";
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
  const [productFilters, setProductFilters] = useState(state);
  const allProduct = useSelector((state) => state.product.products);
  const [product, setProduct] = useState(allProduct);
  // const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([1]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // const getProduct = async () => {
  //   //   try {
  //   //     const res = await fetchData.get(
  //   //       cat ? `/product?categories=${cat}` : "/products"
  //   //     );
  //   //     setProducts(res.data);
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // };
  //   // getProduct();
  // }, [cat]);

  // useEffect(() => {
  //   getProducts(dispatch, searchCategorie);
  // }, [dispatch, searchCategorie]);

  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);

  useEffect(() => {
    productFilters ? setProduct(productFilters) : setProduct(allProduct);
  }, [productFilters, allProduct]);

  useEffect(() => {
    // if (productFilters) {
    if (sort === "newest") {
      setProductFilters((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProductFilters((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setProductFilters((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
    // }
    // if (sort === "newest") {
    //   setProduct((prev) => [...prev].sort((a, b) => a.createdAt - b.createAt));
    // } else if (sort === "asc") {
    //   setProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    // } else if (sort === "desc") {
    //   setProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    // }
  }, [sort]);

  console.log(productFilters);

  // dispatch(addToProduct([...products]));

  return (
    <Container>
      {productFilters?.length > 0
        ? productFilters?.map((item) => <Product item={item} key={item._id} />)
        : product?.map((item) => <Product item={item} key={item._id} />)}
      {/* popularProduct di ganti dengan  product */}
    </Container>
  );
};

export default Products;
