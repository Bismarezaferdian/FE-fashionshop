import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../data";
import { getCategories } from "../redux/apiCall";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 60px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const allProduct = useSelector((state) => state.product.products);
  const allCategories = useSelector((state) => state.categorie.categories);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, SetCategory] = useState("");

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const handleClick = (e) => {
    SetCategory(
      allProduct.filter((item) => item.title.toLowerCase().includes(e))
    );
    // navigate("/products", { state: ctg });
  };
  console.log(category);

  return (
    <Container>
      {categories.map((item, i) => (
        <div onClick={() => handleClick(item.brand)} key={i}>
          {/* <div onClick={() => console.log("test")}> */}
          <CategoryItem item={item} />
        </div>
      ))}
    </Container>
  );
};

export default Categories;
