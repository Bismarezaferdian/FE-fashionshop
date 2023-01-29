import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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
  // filters &&
  //   setProductFilters(
  //     allProduct.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   );
  // }, [allProduct, filters, productFilters]);

  // console.log(sort);
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
    } else {
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
  }, [sort, state]);

  useEffect(() => {
    productFilters ? setProduct(productFilters) : setProduct(allProduct);
  }, [productFilters, allProduct]);

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
