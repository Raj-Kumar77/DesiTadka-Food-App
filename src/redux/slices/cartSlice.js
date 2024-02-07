import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: localStorage.getItem("food-cart")
    ? JSON.parse(localStorage.getItem("food-cart"))
    : [],
};

// cart slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // add to cart  and increment item
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }

      localStorage.setItem("food-cart", JSON.stringify(state.carts));
    },

    // remove from cart
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((ele) => ele.id !== action.payload);
      localStorage.setItem("food-cart", JSON.stringify(state.carts));
    },

    // decrement item in cart
    decrementItem: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.carts[itemIndex].qnty >= 1) {
        state.carts[itemIndex].qnty -= 1;
      }
      localStorage.setItem("food-cart", JSON.stringify(state.carts));
    },

    // clear cart
    clearCart: (state, action) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeFromCart, decrementItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
