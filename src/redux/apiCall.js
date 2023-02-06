import { fetchData, fetchUser } from "../useFetch";
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

export const addCart = async (dispatch, data) => {
  // console.log(data);
  dispatch(addCartStart());
  try {
    const res = await fetchData.post("/carts", data);
    dispatch(addToCart(res.data));
  } catch (error) {
    dispatch(addCartFailure());
  }
};

export const updatecart = async (dispatch, id, data) => {
  console.log(data, id);
  // dispatch(updateQtyStart())
  try {
    const res = await fetchData.put(`/carts/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

//product seach by new and limit http://localhost:3000/api/v1/products?new=true&limit=2
