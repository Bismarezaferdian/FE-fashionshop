import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./action";

// const initialState = {
//   userId: null,
//   products: [],
//   quantity: 0,
//   total: 0,
//   error: false,
//   isFetch: false,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

//   reducers: {
//     addCartStart: (state) => {
//       state.error = false;
//       state.isFetch = true;
//     },

//     addToCart: (state, { payload }) => {
//       console.log(payload);
//       state.products.push(payload);
//       state.total += payload.products[0].price * payload.products[0].quantity;
//     },
//     addCartFailure: (state) => {
//       state.isFetch = false;
//       state.error = true;
//     },

//     // addQty
//   },
// });
// export const { addToCart, addCartFailure, addCartStart } = cartSlice.actions;
// export default cartSlice.reducer;

const initialState = {
  userId: null,
  products: [],
  qty: 0,
  total: 0,
  error: false,
  isFetch: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),

  reducers: {
    addCartStart: (state) => {
      state.error = false;
      state.isFetch = true;
    },

    addToCart: (state, { payload }) => {
      state.isFetch = false;
      state.error = false;
      if (payload.products instanceof Array) {
        payload.products.forEach((product) => {
          const inCart = state.products.find(
            (item) =>
              item._id === product._id &&
              item.color === product.color &&
              item.size === product.size
          );
          if (!inCart) {
            state.products.push(product);
            state.qty += 1;
            state.total += product.quantity * product.price;
          }
        });
      } else {
        // Check if the product is already in the cart
        const inCart = state.products.find(
          (item) =>
            item._id === payload.products._id &&
            item.color === payload.products.color &&
            item.size === payload.products.size
        );
        // If the payload is already in the cart, update its quantity
        if (inCart) {
          inCart.quantity += payload.products.quantity;
          state.total += inCart.quantity * inCart.price;
        } else {
          // If the payload is not in the cart, add it
          state.products.push(payload.products);
          state.qty += 1;
          state.total += payload.products.quantity * payload.products.price;
        }
      }

      state.userId = payload.userId;
    },

    addQty: (state, { payload }) => {
      state.isFetch = false;
      state.error = false;
      // console.log(payload);
      const inCart = state.products.find(
        (item) =>
          item._id === payload._id &&
          item.color === payload.color &&
          item.size === payload.size
      );
      if (inCart) {
        inCart.quantity += 1;
        state.total += inCart.price;
      }
    },

    addCartFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },
    removeQty: (state, { payload }) => {
      state.isFetch = false;
      state.error = false;
      const inCart = state.products.find(
        (item) =>
          item._id === payload._id &&
          item.color === payload.color &&
          item.size === payload.size
      );
      // if (inCart) inCart.quantity -= 1;

      if (inCart && inCart.quantity > 1) {
        inCart.quantity -= 1;
        state.total -= inCart.price;
      } else if (inCart && inCart.quantity === 1) {
        state.products.splice(
          // state.products.indexOf(
          state.products.findIndex(
            (item) =>
              item._id === payload._id &&
              item.color === payload.color &&
              item.size === payload.size
          ),
          1
        );
        state.total -= inCart.price;
        state.qty -= 1;
      }
    },
  },
});

export const {
  addToCart,
  addQty,
  removeQty,
  removeChart,
  addCartStart,
  addCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
