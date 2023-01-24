import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categorie",
  initialState: {
    categories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getCategoriesStart: (state) => {
      state.error = false;
      state.isFetching = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.categories = action.payload;
    },
    getCategoriesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
