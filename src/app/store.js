import { configureStore } from "@reducjs/toolkit";
import ProductsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: ProductsReducer,
  },
});
