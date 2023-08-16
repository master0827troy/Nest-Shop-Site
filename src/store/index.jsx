import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";
import cartSlice from "./cart-slice";
import wishlistSlice from "./WishlistSlice";

const store = configureStore({
  reducer: {
    authentication: AuthSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  }
});

export default store;