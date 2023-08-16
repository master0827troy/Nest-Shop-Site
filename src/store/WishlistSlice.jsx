import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';
import { getAuth } from 'firebase/auth';
import {toast} from 'react-toastify';

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
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const updatedWishlist = [...wishlistItems];
      if (!wishlistItems.includes(itemId)) {
        updatedWishlist.push(itemId);

        await updateDoc(doc(db, 'users', userId), {
          wishlistItems: updatedWishlist
        });
      }

      toast.success('Added item to wishlist!')
        
      return updatedWishlist;
    } catch (error) {
      toast.error('You need to log in first!')

      return initialWishlistState.items;
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  'wishlist/removeItemFromWishlist',
  async ({ wishlistItems, itemId }) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      
      const updatedWishlist = wishlistItems.filter(item => item !== itemId);

      await updateDoc(doc(db, 'users', userId), {
        wishlistItems: updatedWishlist
      });

      toast.success('Removed item to wishlist!')
        
      return updatedWishlist;
    } catch (error) {
      toast.error('You need to log in first!')

      return initialWishlistState.items;
    }
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