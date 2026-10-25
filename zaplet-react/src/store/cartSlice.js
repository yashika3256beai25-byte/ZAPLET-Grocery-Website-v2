import { createSlice } from "@reduxjs/toolkit";
import { cartReducers } from "../reducers/cartReducer";

// Redux Toolkit is the single source of truth for the cart.
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: cartReducers,
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
