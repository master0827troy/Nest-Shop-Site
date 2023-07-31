import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          image: newItem.image,
          price: newItem.price,
          rating: newItem.rating,
          stock: newItem.stock,
          quantity: 1,
        })
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
    },
    emptyCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }   
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;