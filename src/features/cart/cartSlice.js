import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: () => {},
    removeFromCart: () => {},
    clearcart: () => {},
  },
});

export const { addToCart, removeFromCart, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
