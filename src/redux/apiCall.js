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

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await fetchUser.post("/auth/login", user);
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
    console.log(res.data);
    dispatch(cat ? getProductFilter(res.data) : getProductSucces(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

//product seach by new and limit http://localhost:3000/api/v1/products?new=true&limit=2
