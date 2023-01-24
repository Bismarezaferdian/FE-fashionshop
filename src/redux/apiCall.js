import { fetchUser } from "../useFetch";
import { loginStart, loginSuccess, loginFailure } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await fetchUser.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

//product seach by new and limit http://localhost:3000/api/v1/products?new=true&limit=2
