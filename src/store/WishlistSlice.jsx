import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../api/firebase";
import { toast } from "react-toastify";

const initialWishlistState = {
  items: [],
};

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlistItems",
  async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const userData = await getDoc(doc(db, "users", userId));
      const wishlistItems = userData.data().wishlistItems;

      return wishlistItems;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItemToWishlist",
  async ({ wishlistItems, itemId }) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      if (!wishlistItems.includes(itemId)) {
        const updatedWishlist = [itemId, ...wishlistItems];

        await updateDoc(doc(db, "users", userId), {
          wishlistItems: updatedWishlist,
        });

        toast.success("Added product to wishlist!");

        return updatedWishlist;
      }

      toast.info("Product is already in wishlist!");
    } catch (error) {
      toast.error("You need to log in first!");
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItemFromWishlist",
  async ({ wishlistItems, itemId }) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      if (wishlistItems.includes(itemId)) {
        const updatedWishlist = wishlistItems.filter((item) => item !== itemId);

        await updateDoc(doc(db, "users", userId), {
          wishlistItems: updatedWishlist,
        });

        toast.success("Removed product from wishlist!");

        return updatedWishlist;
      }

      toast.info("Product is not in wishlist!");
    } catch (error) {
      toast.error("You need to log in first!");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    emptyWishlist(state) {
      state.items = initialWishlistState.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload;
        }
      });
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
