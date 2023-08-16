import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';
import { getAuth } from 'firebase/auth';

const initialWishlistState = {
  items: []
};

export const getWishlistItems = createAsyncThunk(
  'wishlist/getWishlistItems',
  async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const userData = await getDoc(doc(db, 'users', userId));
      const wishlistItems = userData.data().wishlistItems;

      return wishlistItems;
    } catch (error) {
      console.log(error)
    }
  }
);

export const addItemToWishlist = createAsyncThunk(
  'wishlist/addItemToWishlist',
  async ({ wishlistItems, itemId }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const updatedWishlist = [...wishlistItems];
    if (!wishlistItems.includes(itemId)) {
      updatedWishlist.push(itemId);

      await updateDoc(doc(db, 'users', userId), {
        wishlistItems: updatedWishlist
      });
    }

    return updatedWishlist;
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  'wishlist/removeItemFromWishlist',
  async ({ wishlistItems, itemId }) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    
    const updatedWishlist = wishlistItems.filter(item => item !== itemId);

    await updateDoc(doc(db, 'users', userId), {
      wishlistItems: updatedWishlist
    });

    return updatedWishlist;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialWishlistState,
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  }
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;