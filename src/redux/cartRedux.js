import { createSlice, current } from "@reduxjs/toolkit";
import { revertAll } from "./action";

const initialState = {
  userId: null,
  products: [],
  quantity: 0,
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
      console.log(payload);
      state.products.push(payload);
      state.total += payload.products[0].price * payload.products[0].quantity;
    },
    addCartFailure: (state) => {
      state.isFetch = false;
      state.error = true;
    },

    // addQty
  },
});
export const { addToCart, addCartFailure, addCartStart } = cartSlice.actions;
export default cartSlice.reducer;

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

//       /////////
//       // Loop through the array of products in payload
//       payload.products.forEach((product) => {
//         // Check if the product is already in the cart
//         const inCart = state.products.find(
//           (item) =>
//             item._id === product._id &&
//             item.color === product.color &&
//             item.size === product.size
//         );

//         // If the product is already in the cart, update its quantity
//         if (inCart) {
//           inCart.quantity += product.quantity;
//         } else {
//           // If the product is not in the cart, add it
//           state.quantity += 1;
//           state.products.push(product);
//         }
//       });

//       state.userId = payload.userId;
//       ///////////////
//       // const { userId, ...carts } = payload;
//       // const inCart = state.products.find(
//       //   (item) =>
//       //     item._id === payload._id &&
//       //     item.color === payload.color &&
//       //     item.size === payload.size
//       // );
//       // if (inCart) {
//       //   console.log("true");
//       //   inCart.quantity += payload.quantity;
//       // } else {
//       //   state.quantity += 1;
//       //   console.log("false");
//       //   state.products.push(carts);
//       // }
//       // state.userId = userId;
//       // state.total += payload.price * payload.quantity;
//     },

//     addQty: (state, { payload }) => {
//       const inCart = state.products.find(
//         (item) =>
//           item._id === payload.id &&
//           item.color === payload.color &&
//           item.size === payload.size
//       );
//       if (inCart) {
//         inCart.quantity += 1;
//         state.total += inCart.price;
//       }
//     },
//     removeQty: (state, { payload }) => {
//       const inCart = state.products.find(
//         (item) =>
//           item._id === payload.id &&
//           item.color === payload.color &&
//           item.size === payload.size
//       );
//       // if (inCart) inCart.quantity -= 1;

//       if (inCart) {
//         inCart.quantity -= 1;
//         state.total -= inCart.price;
//       }
//     },

//     removeChart: (state, { payload }) => {
//       console.log(
//         state.products.findIndex(
//           (item) =>
//             item._id === payload.id &&
//             item.color === payload.color &&
//             item.size === payload.size
//         )
//       );
//       const inCart = state.products.find(
//         (item) =>
//           item._id === payload.id &&
//           item.color === payload.color &&
//           item.size === payload.size
//       );
//       state.products.splice(
//         // state.products.indexOf(
//         state.products.findIndex(
//           (item) =>
//             item._id === payload.id &&
//             item.color === payload.color &&
//             item.size === payload.size
//         ),
//         1
//       );
//       state.quantity -= 1;
//       state.total -= inCart.price;
//     },
//   },

//   addCartFailure: (state) => {
//     state.isFetch = false;
//     state.error = true;
//   },
// });

// export const {
//   addToCart,
//   addQty,
//   removeQty,
//   removeChart,
//   addCartStart,
//   addCartFailure,
// } = cartSlice.actions;
// export default cartSlice.reducer;
