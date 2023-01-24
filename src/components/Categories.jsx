import styled from "styled-components";
import { categories } from "../data";
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
  return (
    <Container>
      {categories.map((item, i) => (
        <CategoryItem item={item} key={i} />
      ))}
    </Container>
  );
};

export default Categories;
