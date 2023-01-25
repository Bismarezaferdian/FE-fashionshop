import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productFilters: [],
    isFething: false,
    error: false,
  },

  reducers: {
    addToProduct: (state, action) => {
      state.products = action.payload;
    },
    addToFilter: (state, action) => {
      state.productFilters = action.payload;
    },
    getProductStart: (state) => {
      state.isFething = true;
      state.error = false;
    },
    getProductSucces: (state, action) => {
      state.isFething = false;
      state.error = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFething = false;
      state.error = true;
    },
  },
});

export const {
  addToProduct,
  addToFilter,
  getProductStart,
  getProductSucces,
  getProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
