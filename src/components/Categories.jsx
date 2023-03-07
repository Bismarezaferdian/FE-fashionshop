import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCategories } from "../redux/apiCall";
import { mobile } from "../responsive";
import { fetchData } from "../useFetch";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 40px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const { categories, isFetching } = useSelector((state) => state.categorie);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const handleClick = async (e) => {
    try {
      const res = await fetchData.get(
        `/products?categories=${e.toUpperCase()}`
      );
      navigate("/products", { state: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  // //or can use filter from all product
  // useEffect(() => {
  //   const prd = allProduct.filter((item) => item.categories.includes(category));
  //   navigate("/products", { state: prd });
  // }, [navigate, category, allProduct]);

  return (
    <Container>
      {categories.map((item, i) => (
        <div key={i}>
          {isFetching ? (
            <>
              <Skeleton
                // sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                animation="wave"
                width={210}
                height={118}
              />
            </>
          ) : (
            <div onClick={() => handleClick(item.brand)} key={i}>
              {/* <div onClick={() => console.log("test")}> */}
              <CategoryItem item={item} />
            </div>
          )}
        </div>
      ))}
    </Container>
  );
};

export default Categories;
