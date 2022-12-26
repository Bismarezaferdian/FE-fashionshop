import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productFilters: [],
  },

  reducers: {
    addToProduct: (state, action) => {
      state.products = action.payload;
    },
    addToFilter: (state, action) => {
      state.productFilters = action.payload;
    },
  },
});

export const { addToProduct, addToFilter } = productSlice.actions;
export default productSlice.reducer;
