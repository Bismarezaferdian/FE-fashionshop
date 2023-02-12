import { fetchData } from "../useFetch";
import { loginStart, loginSuccess, loginFailure } from "./userRedux";
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
} from "./categoriesRedux";
import {
  getProductFailure,
  getProductFilter,
  getProductStart,
  getProductSucces,
} from "./productRedux";
import { addCartFailure, addCartStart, addToCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await fetchData.post("/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getCategories = async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const res = await fetchData.get("/categories/");
    dispatch(getCategoriesSuccess(res.data));
  } catch (error) {
    dispatch(getCategoriesFailure());
  }
};

export const getProducts = async (dispatch, cat) => {
  dispatch(getProductStart());
  try {
    const res = await fetchData.get(
      cat ? `/products?categories=${cat}` : "/products/"
    );
    if (res.data.length <= 0) alert("product tidak ada");
    dispatch(cat ? getProductFilter(res.data) : getProductSucces(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

// export const addCart = async (dispatch, userId, products) => {
//   console.log();
//   dispatch(addCartStart());
//   try {
//     // const res = await fetchData.post("/carts", {
//     //   userId: userId,
//     //   products: products,
//     // });
//     // console.log(res);
//     dispatch(addToCart(userId, { products }));
//   } catch (error) {
//     dispatch(addCartFailure());
//   }
// };
export const getCart = async (userId, dispatch) => {
  console.log(userId);
  try {
    const res = await fetchData.get(`/carts/${userId}`);
    dispatch(addToCart(res.data, userId));
  } catch (error) {}
};

export const updatecart = async (userId, data, dispatch) => {
  // console.log(userId, data);
  dispatch(addCartStart());
  try {
    await fetchData.post(`/carts/${userId}`, data);
  } catch (error) {
    dispatch(addCartFailure());
    console.log(error);
  }
};
export const deleteProductCart = async (userId, data) => {
  try {
    await fetchData.post(`/carts/deleteProductCart/${userId}`, data);
  } catch (error) {
    console.log(error);
  }
};

//product seach by new and limit http://localhost:3000/api/v1/products?new=true&limit=2
