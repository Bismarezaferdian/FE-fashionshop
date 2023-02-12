import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../redux/apiCall";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  //menerima state kiriman dari input searc from navbar and search from category
  const { state } = useLocation();
  const [productFilters, setProductFilters] = useState(state);
  const allProduct = useSelector((state) => state.product.products);
  const [product, setProduct] = useState(allProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setProductFilters(state);
  }, [state]);

  // useEffect(() => {
  // filters &&
  //   setProductFilters(
  //     allProduct.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   );
  // }, [allProduct, filters, productFilters]);

  useEffect(() => {
    if (state) {
      if (sort === "newest") {
        setProductFilters((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
      } else if (sort === "asc") {
        setProductFilters((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
      } else {
        setProductFilters((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      }
    } else if (allProduct) {
      if (sort === "newest") {
        setProduct((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
      } else if (sort === "asc") {
        setProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
      } else if (sort === "desc") {
        setProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    }
  }, [sort, state, allProduct]);

  // useEffect(() => {
  //   productFilters ? setProduct(productFilters) : setProduct(allProduct);
  // }, [productFilters, state, allProduct]);

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
