import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    authentication: AuthSlice
  }
});

export default store;