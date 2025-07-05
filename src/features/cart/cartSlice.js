import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quanity += 1;
      } else {
        state.items.push({ ...item, quanity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem.quanity > 1) {
        existingItem.quanity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== item.id);
      }
    },
    clearcart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
